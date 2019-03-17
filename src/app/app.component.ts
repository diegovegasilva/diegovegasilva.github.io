import { Component } from '@angular/core';

import { MatDialog } from '@angular/material';
import { CitySelectorComponent } from './shared/city-selector/city-selector.component';
import { WeatherService } from './services/weather.service';

import _ from 'lodash';

@Component({
  selector: 'PWA-weather-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'PWA-weather-app';
  cityToAdd: number;
  citiesForeCast: Array<object> = [];

  constructor(
    private weatherService: WeatherService,
    public dialog: MatDialog
  ) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(CitySelectorComponent, {
      width: '250px',
      data: { name: 'pwpw', animal: 'pepe' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      this.cityToAdd = result;
      if (result) {
        this.weatherService.get5DayForecast(result).subscribe((data: any) => {
          let cityIndex = _.findIndex(
            this.citiesForeCast,
            city => city.city.id === data.city.id
          );
          if (cityIndex > -1) {
            this.citiesForeCast.splice(cityIndex, 1, data);
          } else {
            this.citiesForeCast.push(data);
          }
          console.log('weather data', this.citiesForeCast);
        });
      }
    });
  }

  addCity() {
    this.openDialog();
    console.log('add city button pushed');
  }

  removeCity(cityId) {
    _.remove(this.citiesForeCast, city => city.city.id === cityId);
  }
}
