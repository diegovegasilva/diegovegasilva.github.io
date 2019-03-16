import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';
import _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APIkey = '6a883b5d7521e28b540b013b11b0d2ae';
  constructor(private http: HttpClient) {}

  get5DayForecast(cityId) {
    let url = 'https://api.openweathermap.org/data/2.5/forecast?id=';
    return this.http.get(`${url}${cityId}&appid=${this.APIkey}`).pipe(
      map(res => {
        this.filterByDay(res);
        return res;
      })
    );
  }

  filterByDay(data) {
    data.forecast = [];
    let addedDays = [];
    _.each(data.list, fore => {
      let tempDay = fore.dt_txt.substring(0, 10);
      if (_.indexOf(addedDays, tempDay) < 0) {
        addedDays.push(tempDay);
        data.forecast.push(fore);
      }
    });
  }
}
