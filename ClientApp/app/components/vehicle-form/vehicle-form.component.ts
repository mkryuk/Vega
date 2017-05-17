import { FeatureService } from './../../services/feature.service';
import { MakeService } from './../../services/make.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {

  makes: any[];
  models: any[];
  vehicle: any = {};
  features: any[];
  constructor(private makeService: MakeService, private featureService: FeatureService) {

  }

  ngOnInit() {
    this.makeService.getMakes()
      .subscribe(makes => this.makes = makes);
    this.featureService.getFeatures()
      .subscribe(features => this.features = features);
  }

  onMakeChange() {
    let selectedMake = this.makes.find(make => make.id == this.vehicle.make);
    this.models = selectedMake ? selectedMake.models : [];
  }

}
