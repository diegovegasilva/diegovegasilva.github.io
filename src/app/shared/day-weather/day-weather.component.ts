import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'PWA-weather-day-weather',
  templateUrl: './day-weather.component.html',
  styleUrls: ['./day-weather.component.scss']
})
export class DayWeatherComponent implements OnInit {
  @Input() weather;
  imgURL: string;

  constructor() {
    
  }

  ngOnInit() {
    this.imgURL = this.weather.weather[0].icon.slice(0, -1);
  }
}
