import { AppErrorHandler } from './app.error-handler';
import { FormsModule } from '@angular/forms';
import { NgModule, ErrorHandler } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastyModule } from 'ng2-toasty';
import { UniversalModule } from 'angular2-universal';

import { AppComponent } from './components/app/app.component'
import { CounterComponent } from './components/counter/counter.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { HomeComponent } from './components/home/home.component';
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vehicle.service';

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    NavMenuComponent,
    CounterComponent,
    FetchDataComponent,
    HomeComponent,
    VehicleFormComponent
  ],
  imports: [
    UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
    ToastyModule.forRoot(),
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'vehicles/new', component: VehicleFormComponent },
      { path: 'vehicles/:id', component: VehicleFormComponent },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: '**', redirectTo: 'home' }
    ]),
    FormsModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: AppErrorHandler },
    VehicleService
  ]
})
export class AppModule {
}
