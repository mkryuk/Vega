import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyModule, ToastyService } from 'ng2-toasty';
import "rxjs/add/Observable/forkJoin";
import { Observable } from "rxjs/Observable";
import * as _ from "underscore";
import { VehicleService } from './../../services/vehicle.service';
import { SaveVehicle, Vehicle } from './../models/vehicle';

@Component({
  selector: 'app-vehicle-form',
  styleUrls: ['./vehicle-form.component.css'],
  templateUrl: './vehicle-form.component.html',
})
export class VehicleFormComponent implements OnInit {

  public makes: any[];
  public models: any[];
  public features: any[];
  public vehicle: SaveVehicle = {
    contact: {
      email: "",
      name: "",
      phone: "",
    },
    features: [],
    id: 0,
    isRegistered: false,
    makeId: 0,
    modelId: 0,
  };
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    private toastyService: ToastyService) {
    route.params.subscribe((p) => {
      this.vehicle.id = +p.id;
    });
  }

  public ngOnInit() {

    const sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures(),
    ];
    if (this.vehicle.id) {
      sources.push(this.vehicleService.getVehicle(this.vehicle.id))
    }
    Observable.forkJoin(sources)
      .subscribe((data) => {
        this.makes = data[0];
        this.features = data[1];
        if (this.vehicle.id) {
          this.setVehicle(data[2]);
          this.populateModels();
        }
      }, (err) => {
        if (err.status === 404) {
          this.router.navigate(['/home']);
        }
      });
  }

  public onMakeChange() {
    this.populateModels();
    delete this.vehicle.modelId;
  }

  public onFeatureToggle(featureId, $event) {
    if ($event.target.checked) {
      this.vehicle.features.push(featureId);
    } else {
      const index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index, 1);
    }
  }

  public submit() {
    if (this.vehicle.id) {
      this.vehicleService.update(this.vehicle)
        .subscribe((x) => {
          this.toastyService.success({
            msg: "Vehicle updated",
            showClose: true,
            theme: "bootstrap",
            timeout: 5000,
            title: "Success",
          });
        });
    } else {
      delete this.vehicle.id;
      this.vehicleService.create(this.vehicle)
        .subscribe((x) => console.log(x));
    }
  }

  public delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe((x) => this.router.navigate(['/home']));
    }
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
    // tslint:disable-next-line:triple-equals
    const selectedMake = this.makes.find((make) => make.id == this.vehicle.makeId);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
