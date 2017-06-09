import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { VehicleService } from './../../services/vehicle.service';

@Component({
  templateUrl: 'view-vehicle.component.html',
})
export class ViewVehicleComponent implements OnInit {
  public vehicle: any;
  public vehicleId: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService) {

    route.params.subscribe((p) => {
      // tslint:disable-next-line:no-string-literal
      this.vehicleId = +p['id'];
      if (isNaN(this.vehicleId) || this.vehicleId <= 0) {
        router.navigate(['/vehicles']);
        return;
      }
    });
  }

  public ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
      .subscribe(
      (v) => this.vehicle = v,
      (err) => {
        if (err.status == 404) {
          this.router.navigate(['/vehicles']);
          return;
        }
      });
  }

  public delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe((x) => {
          this.router.navigate(['/vehicles']);
        });
    }
  }
}
