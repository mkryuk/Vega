import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { BrowserXhr } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';
import { AuthService } from './../../services/auth.service';
import { BrowserXhrWithProgress } from './../../services/browser.xhr.progress';
import { PhotoService } from './../../services/photo.service';
import { ProgressService } from './../../services/progress.service';
import { VehicleService } from './../../services/vehicle.service';

@Component({
  providers: [
    { provide: BrowserXhr, useClass: BrowserXhrWithProgress },
    ProgressService,
  ],
  templateUrl: 'view-vehicle.component.html',
})
export class ViewVehicleComponent implements OnInit {
  public vehicle: any;
  public vehicleId: number;
  public photos: any[];
  public progress: any;
  @ViewChild("fileInput") private fileInput: ElementRef;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toasty: ToastyService,
    private vehicleService: VehicleService,
    private photoService: PhotoService,
    private progressService: ProgressService,
    private zone: NgZone) {

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
    this.photoService.getPhotos(this.vehicleId)
      .subscribe((photos) => this.photos = photos);
  }

  public delete() {
    if (confirm("Are you sure?")) {
      this.vehicleService.delete(this.vehicle.id)
        .subscribe((x) => {
          this.router.navigate(['/vehicles']);
        });
    }
  }

  public uploadPhoto() {
    this.progressService.startTracking()
      .subscribe((progress) => {
        this.zone.run(() => {
          this.progress = progress;
        });
      }, null, () => {
        this.progress = null;
      });
    const el: HTMLInputElement = this.fileInput.nativeElement;
    const file = el.files[0];
    el.value = "";

    this.photoService.upload(this.vehicleId, file)
      .subscribe(
      (photo) => this.photos.push(photo),
      (error) => {
        this.toasty.error({
          msg: error.text(),
          showClose: true,
          theme: "bootstrap",
          timeout: 5000,
          title: "Error",
        });
      });
  }
}
