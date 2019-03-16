import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'PWA-weather-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() weatherData;
  constructor() { }

  ngOnInit() {
  }

}
