import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { WeatherCardComponent } from './weather-card/weather-card.component';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { DayWeatherComponent } from './day-weather/day-weather.component';
import { UsersComponent } from './users/users.component';
import { NotificationPromtComponent } from './notification-promt/notification-promt.component';

@NgModule({
  declarations: [WeatherCardComponent, CitySelectorComponent, DayWeatherComponent, UsersComponent, NotificationPromtComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    WeatherCardComponent,
    CitySelectorComponent,
    UsersComponent
  ]
})
export class SharedModule { }
