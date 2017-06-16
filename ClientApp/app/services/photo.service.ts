import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PhotoService {

  constructor(private http: Http) { }

  public getPhotos(vehicleId) {
    return this.http.get(`api/vehicles/${vehicleId}/photos`)
      .map((response) => response.json());
  }

  public upload(vehicleId, photo) {
    const formData = new FormData();
    formData.append("file", photo);
    return this.http.post(`/api/vehicles/${vehicleId}/photos`, formData)
      .map((res) => res.json());
  }
}
