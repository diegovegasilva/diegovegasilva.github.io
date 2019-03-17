import { Component, OnInit } from '@angular/core';

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
export class AppComponent implements OnInit{
  title = 'PWA-weather-app';
  citiesForeCast: Array<object> = [];
  activeCities: any[];
  loading: boolean = true;


  constructor(
    private weatherService: WeatherService,
    public dialog: MatDialog
  ) {
    if(localStorage.getItem('selectedCities')){
      let activeIds = _.map(localStorage.getItem('selectedCities').split(','), id => parseInt(id));
      this.activeCities  = activeIds;
    } else {
      this.activeCities = []
    }
  }

  ngOnInit(){
    if(this.activeCities.length > 0){
      this.getCitiesForecast(this.activeCities)
    } else{
      this.activeCities = [initialCity[0].city.id];
      this.citiesForeCast = initialCity;
    }
  }
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
    _.remove(this.citiesForeCast, city => parseInt(city.city.id) === parseInt(cityId));
    _.remove(this.activeCities, city => parseInt(city) === parseInt(cityId));
    console.log(this.activeCities)
    localStorage.setItem('selectedCities', this.activeCities.join());
  }

  addCityData(cityId) {
    this.loading = true;
    this.weatherService.get5DayForecast(cityId).subscribe((data: any) => {
      this.loading = false;
      console.log(this.activeCities, data.city.id)
      let cityIndex = _.indexOf(this.activeCities, data.city.id)
      console.log('cityIndex', cityIndex, cityId);
      if (cityIndex > -1) {
        this.citiesForeCast.splice(cityIndex, 1, data);
      } else {
        this.citiesForeCast.push(data);
        this.activeCities.push(data.city.id);
        localStorage.setItem('selectedCities', this.activeCities.join())
      }
    });
  }
}
