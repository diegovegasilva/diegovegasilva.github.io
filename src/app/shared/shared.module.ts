import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherCardComponent } from './weather-card/weather-card.component';
import { CitySelectorComponent } from './city-selector/city-selector.component';

@NgModule({
  declarations: [WeatherCardComponent, CitySelectorComponent],
  imports: [
    CommonModule
  ], exports: [WeatherCardComponent, CitySelectorComponent]
})
export class SharedModule { }
