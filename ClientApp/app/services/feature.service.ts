import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";

@Injectable()
export class FeatureService {

  constructor(private http: Http) { }

  public getFeatures() {
    return this.http.get("api/features")
      .map((features) => features.json());
  }

}
