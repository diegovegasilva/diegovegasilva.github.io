import { Component } from '@angular/core';

import { MatDialog } from '@angular/material';
import { CitySelectorComponent } from './shared/city-selector/city-selector.component';
import { WeatherService } from './services/weather.service';

import { initialCity } from './shared/models/initial-city.model';

import _ from 'lodash';

@Component({
  selector: 'PWA-weather-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent{
  title = 'PWA-weather-app';
  citiesForeCast: Array<object> = initialCity;
  activeCities: number[] = [initialCity[0].city.id];
  loading: boolean = true;


  constructor(
    private weatherService: WeatherService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CitySelectorComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addCityData(result);
      }
    });
  }

  addCity() {
    this.openDialog();
  }

  getCitiesForecast(citiesId) {
    this.citiesForeCast = [];
    _.each(citiesId, cityId => this.addCityData(cityId));
  }

  removeCity(cityId) {
    _.remove(this.citiesForeCast, city => city.city.id === cityId);
    _.remove(this.activeCities, city => city === cityId);
  }

  addCityData(cityId) {
    this.loading = true;
    this.weatherService.get5DayForecast(cityId).subscribe((data: any) => {
      this.loading = false;
      let cityIndex = _.findIndex(
        this.citiesForeCast,
        city => city.city.id === data.city.id
      );
      if (cityIndex > -1) {
        this.citiesForeCast.splice(cityIndex, 1, data);
      } else {
        this.citiesForeCast.push(data);
        this.activeCities.push(data.city.id);
      }
    });
  }
}
