import { Injectable } from '@angular/core';
import { BrowserXhr } from "@angular/http";
import { ProgressService } from './progress.service';
@Injectable()
export class BrowserXhrWithProgress extends BrowserXhr {

  constructor(private progressService: ProgressService) {
    super();
  }

  public build(): XMLHttpRequest {
    const xhr: XMLHttpRequest = super.build();
    // xhr.onprogress = (event) => {
    //   this.progressService.downloadProgress.next(this.createProgress(event));
    // };
    xhr.upload.onprogress = (event) => {
      this.progressService.notify(this.createProgress(event));
    };

    xhr.upload.onloadend = () => {
      this.progressService.endTracking();
    };
    return xhr;
  }

  private createProgress(event) {
    return {
      percentage: Math.round(event.loaded / event.total * 100),
      total: event.total,
    }
  }
}
