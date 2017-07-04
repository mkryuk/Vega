import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt/angular2-jwt';
import 'rxjs/add/operator/map';
import { SaveVehicle } from './../components/models/vehicle';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = "/api/vehicles";

  constructor(private http: Http, private authHttp: AuthHttp) { }

  public getFeatures() {
    return this.http.get('/api/features')
      .map((res) => res.json());
  }

  public getMakes() {
    return this.http.get('/api/makes')
      .map((res) => res.json());
  }

  public create(vehicle: SaveVehicle) {
    return this.authHttp.post('/api/vehicles', vehicle)
      .map((res) => res.json());
  }

  public update(vehicle: SaveVehicle) {
    return this.authHttp.put('/api/vehicles/' + vehicle.id, vehicle)
      .map((res) => res.json());
  }

  public getVehicle(id: number) {
    return this.http.get('/api/vehicles/' + id)
      .map((res) => res.json());
  }

  public getVehicles(filter) {
    return this.http.get(this.vehiclesEndpoint + "?" + this.toQueryString(filter))
      .map((res) => res.json());
  }

  public delete(vehicleId: number) {
    return this.authHttp.delete('/api/vehicles/' + vehicleId)
      .map((res) => res.json());
  }

  private toQueryString(obj) {
    const result = [];
    for (const i in obj) {
      if (obj.hasOwnProperty(i)) {
        const value = obj[i];
        if (value !== null && value !== undefined) {
          result.push(encodeURIComponent(i) + "=" + encodeURIComponent(value));
        }
      }
    }
    return result.join("&");
  }
}
