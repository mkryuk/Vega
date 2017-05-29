import * as _ from "underscore";
import { Vehicle, SaveVehicle } from './../models/vehicle';
import { Router, ActivatedRoute } from '@angular/router';
import { VehicleService } from './../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ToastyService, ToastyModule } from 'ng2-toasty';
import "rxjs/add/Observable/forkJoin";

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  vehicle: SaveVehicle = {
    id: 0,
    makeId: 0,
    modelId: 0,
    isRegistered: false,
    features: [],
    contact: {
      email: "",
      name: "",
      phone: ""
    }
  };
  features: any[];
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {
    route.params.subscribe(p => {
      this.vehicle.id = +p['id'];
    });
  }

  ngOnInit() {

    let sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];
    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))
    }
    Observable.forkJoin(sources)
      .subscribe(data => {
        this.makes = data[0];
        this.features = data[1];
        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
      }, err => {
        if (err.status === 404) {
          this.router.navigate(['/home']);
        }
      });
  }

  private setVehicle(v: Vehicle) {
    this.vehicle.id = v.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.makeId = v.make.id;
    this.vehicle.isRegistered = v.isRegistered;
    this.vehicle.contact = v.contact;
    this.vehicle.features = _.pluck(v.features, "id");
  }

  private populateModels() {
    let selectedMake = this.makes.find(make => make.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }
  onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      let index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe(x => {
          this.toastyService.success({
            title: "Success",
            msg: "Vehicle updated",
            theme: "bootstrap",
            showClose: true,
            timeout: 5000
          });
        });
    } else {
      this.vehicleService.create(this.vehicle)
        .subscribe(x => console.log(x));
    }
  }

  delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe(x => this.router.navigate(['/home']));
    }

  }

}
