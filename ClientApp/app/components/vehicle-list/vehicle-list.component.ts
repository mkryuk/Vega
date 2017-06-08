import { Component, NgZone, OnInit } from '@angular/core';
import { VehicleService } from './../../services/vehicle.service';
import { KeyValuePair, Vehicle } from './../models/vehicle';

@Component({
  selector: 'vehicle-list',
  styleUrls: ['./vehicle-list.component.css'],
  templateUrl: './vehicle-list.component.html',
})
export class VehicleListComponent implements OnInit {
  public makes: KeyValuePair;
  public allVehicles: Vehicle[];
  public queryResult: {
    totalItems: number,
    items: Vehicle[],
  } = { items: [], totalItems: 0 };
  public readonly PAGE_SIZE = 3;
  public query: any = {
    page: 1,
    pageSize: this.PAGE_SIZE,
  };
  public columns = [
    { title: "Id", key: "id", isSortable: false },
    { title: "Make", key: "make", isSortable: true },
    { title: "Model", key: "model", isSortable: true },
    { title: "Contact Name", key: "contactName", isSortable: true },
  ];

  constructor(private vehicleService: VehicleService, private ngZone: NgZone) { }

  public ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe((makes) => this.makes = makes);
    this.populateVehicles();
  }
  // TODO: fix that thing

  public onFilterChange() {
    // let vehicles = this.allVehicles;
    // if (this.filter.makeId) {
    //   vehicles = this.allVehicles
    //     .filter((vehicle) => vehicle.make.id == this.filter.makeId);
    // }
    // this.vehicles = vehicles;
    this.query.page = 1;
    this.populateVehicles();
  }

  public resetFilter() {
    this.query = {
      page: 1,
      pageSize: this.PAGE_SIZE,
    };
    this.queryResult.totalItems = 0;
    this.populateVehicles();
  }

  public sortBy(columnName: string) {
    if (this.query.sortBy === columnName) {
      this.query.isSortAscending = !this.query.isSortAscending;
    } else {
      this.query.sortBy = columnName;
      this.query.isSortAscending = false;
    }
    this.populateVehicles();
  }

  public onPageChange(page) {
    this.query.page = page;
    this.populateVehicles();
  }

  private populateVehicles() {
    this.vehicleService.getVehicles(this.query)
      .subscribe((result) => this.queryResult = result);
  }
}
