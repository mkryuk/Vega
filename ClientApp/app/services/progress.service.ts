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
    this.uploadProgress.next(progress);
  }

  public endTracking() {
    this.uploadProgress.complete();
  }
}
