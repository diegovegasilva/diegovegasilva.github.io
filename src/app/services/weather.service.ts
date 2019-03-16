import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APIkey = '6a883b5d7521e28b540b013b11b0d2ae';
  constructor(private http: HttpClient) {}

  get5DayForecast(cityId) {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?id=';
    return this.http.get(`${url}${cityId}&appid=${this.APIkey}`);
  }
}
