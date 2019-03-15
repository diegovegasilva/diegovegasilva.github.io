import { Component } from '@angular/core';

import {MatDialog} from '@angular/material';
import { CitySelectorComponent } from './shared/city-selector/city-selector.component';
import { WeatherService } from './services/weather.service';

@Component({
  selector: 'PWA-weather-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'PWA-weather-app';
  cityToAdd: number;

  constructor(private weatherService: WeatherService, public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(CitySelectorComponent, {
      width: '250px',
      data: { name: 'pwpw', animal: 'pepe' }
    });

    dialogRef.afterClosed().subscribe(result => {
	  console.log('The dialog was closed', result);
	  this.cityToAdd = result;
	  if(result){
		  this.weatherService.get5DayForecast(result).subscribe( data => {
			  console.log('weather data', data);
		  })
	  }

    });
  }

  addCity(){
	  this.openDialog();
	  console.log('add city button pushed')
  }
}
