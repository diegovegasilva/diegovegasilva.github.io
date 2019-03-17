import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'PWA-weather-day-weather',
  templateUrl: './day-weather.component.html',
  styleUrls: ['./day-weather.component.scss']
})
export class DayWeatherComponent implements OnInit {

  @Input() weather;

  constructor() { }

  ngOnInit() {
  }

}
