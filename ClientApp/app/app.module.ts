import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UniversalModule } from 'angular2-universal';
import { ToastyModule } from 'ng2-toasty';
import { AppErrorHandler } from './app.error-handler';
import { PaginationComponent } from './components/shared/pagination.component';

import { AppComponent } from './components/app/app.component'
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleService } from './services/vehicle.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    PaginationComponent,
    FetchDataComponent,
    HomeComponent,
    VehicleFormComponent,
    VehicleListComponent,
  ],
  imports: [
    UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: VehicleFormComponent },
      { path: 'vehicles', component: VehicleListComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'vehicles' },
    ]),
    FormsModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    VehicleService,
  ],
})
export class AppModule {
}
