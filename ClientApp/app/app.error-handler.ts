import { ToastyService, ToastyModule } from 'ng2-toasty';
import { NgZone, ErrorHandler, Inject, isDevMode } from '@angular/core';

export class AppErrorHandler implements ErrorHandler {
  handleError(error: any): void {
    // if (isDevMode()) {
    //   console.log("This is a dev mode");
    // }
    this.ngZone.run(() => {
      this.toastyService.error({
        title: "Error",
        msg: "Thie unexpected error happened.",
        theme: "bootstrap",
        showClose: true,
        timeout: 5000
      });
    });
  }
  constructor(
    private ngZone: NgZone,
    @Inject(ToastyService) private toastyService: ToastyService) {
  }
}
