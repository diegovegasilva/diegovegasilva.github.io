import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select'
import {MatFormFieldModule} from '@angular/material/form-field';

import { WeatherCardComponent } from './weather-card/weather-card.component';
import { CitySelectorComponent } from './city-selector/city-selector.component';
import { DayWeatherComponent } from './day-weather/day-weather.component';

@NgModule({
  declarations: [WeatherCardComponent, CitySelectorComponent, DayWeatherComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  exports: [
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    WeatherCardComponent,
    CitySelectorComponent
  ]
})
export class SharedModule { }
