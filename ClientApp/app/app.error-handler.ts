import { ErrorHandler, Inject, isDevMode, NgZone } from '@angular/core';
import { ToastyModule, ToastyService } from 'ng2-toasty';

export class AppErrorHandler implements ErrorHandler {
  constructor(
    private ngZone: NgZone,
    @Inject(ToastyService) private toastyService: ToastyService) {
  }
  public handleError(error: any): void {
    // if (isDevMode()) {
    //   console.log("This is a dev mode");
    // }
    this.ngZone.run(() => {
      this.toastyService.error({
        msg: "Thie unexpected error happened.",
        showClose: true,
        theme: "bootstrap",
        timeout: 5000,
        title: "Error",
      });
    });
  }
}
