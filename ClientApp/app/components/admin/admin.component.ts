import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin',
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  public data = {
    datasets: [
      {
        backgroundColor: [
          "#ff6384",
          "#35a2eb",
          "#ffce56",
        ],
        data: [1, 3, 5],
      },
    ],
    labels: ["BMW", "Audi", "Mazda"],
  };

  constructor() { }

  public ngOnInit() {
  }

}
