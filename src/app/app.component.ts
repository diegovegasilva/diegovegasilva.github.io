import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material';
import { CitySelectorComponent } from './shared/city-selector/city-selector.component';
import { WeatherService } from './core/services/weather.service';

import { initialCity } from './shared/models/initial-city.model';

import _ from 'lodash';

import { UsersService } from './core/services/users.service';
import { FirebaseService } from './core/services/firebase.service';
import { NotificationPromtComponent } from './shared/notification-promt/notification-promt.component';
import { tokenKey } from '@angular/core/src/view';

@Component({
	selector: 'PWA-weather-root',
	templateUrl: './app.component.html',
	styles: []
})
export class AppComponent implements OnInit {
	title = 'PWA-weather-app';
	citiesForeCast: Array<object> = [];
	activeCities: any[];
	loading: boolean = true;
	users: Array<any>;
	token: string;
	username: string

	constructor(
		private weatherService: WeatherService,
		private usersService: UsersService,
		private firebaseService: FirebaseService,
		public dialog: MatDialog
	) {
		if (localStorage.getItem('selectedCities')) {
			let activeIds = _.map(
				localStorage.getItem('selectedCities').split(','),
				id => parseInt(id)
			);
			this.activeCities = activeIds;
		} else {
			this.activeCities = [];
		}
	}

	ngOnInit() {
		this.username = localStorage.getItem('username');
		if (this.activeCities.length > 0) {
			this.getCitiesForecast(this.activeCities);
		} else {
			this.activeCities = [initialCity[0].city.id];
			this.citiesForeCast = initialCity;
		}
		this.getUsers();
		if(localStorage.getItem('tokenStored')){
			console.log('got stored')
			this.firebaseService.getToken(this.username).then( token => this.token = token).catch(e => console.log(e));
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
		_.remove(
			this.citiesForeCast,
			city => parseInt(city.city.id) === parseInt(cityId)
		);
		_.remove(this.activeCities, city => parseInt(city) === parseInt(cityId));
		localStorage.setItem('selectedCities', this.activeCities.join());
	}

	addCityData(cityId) {
		this.loading = true;
		this.weatherService.get5DayForecast(cityId).subscribe((data: any) => {
			this.loading = false;
			let cityIndex = _.indexOf(this.activeCities, data.city.id);
			if (cityIndex > -1) {
				this.citiesForeCast.splice(cityIndex, 1, data);
			} else {
				this.citiesForeCast.push(data);
				this.activeCities.push(data.city.id);
				localStorage.setItem('selectedCities', this.activeCities.join());
			}
		});
	}

	getUsers() {
		this.usersService
			.getUsers()
			.subscribe((users: any[]) => (this.users = users));
	}

	subscribe() {
		console.log('open subscribe');
		const dialogRef = this.dialog.open(NotificationPromtComponent, {
			width: '450px'
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.requestPermission(result);
			}
		});
	}

	requestPermission(username) {
		this.firebaseService
			.requestPermission(username)
			.then(token => {
				this.token = token;
				this.username = username;
				console.log('request permission granted')
			})
			.catch(e => {
				console.log('e', e);
			});
	}
}
