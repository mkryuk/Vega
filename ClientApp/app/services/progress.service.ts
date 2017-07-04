import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";

@Injectable()
export class ProgressService {
  public downloadProgress: Subject<any> = new Subject();
  private uploadProgress: Subject<any>;
  public startTracking() {
    this.uploadProgress = new Subject()
    return this.uploadProgress;
  }

  public notify(progress) {
    if (this.uploadProgress) {
      this.uploadProgress.next(progress);
    }
  }

  public endTracking() {
    if (this.uploadProgress) {
      this.uploadProgress.complete();
    }
  }
}
