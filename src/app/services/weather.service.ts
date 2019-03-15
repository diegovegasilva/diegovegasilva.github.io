import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  private APIkey = 'kh3LHheKwG6sUj6wqDZpk9sH9copbroB'
  constructor(private http: HttpClient) { }


  get5DayForecast(cityId) {
    let url = 'http://dataservice.accuweather.com/forecasts/v1/daily/5day/'
    return this.http.get(`${url}${cityId}?apikey=${this.APIkey}`);
  }

}
