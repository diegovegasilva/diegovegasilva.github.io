import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'PWA-weather-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {
  @Input() forecastData;
  @Output() closeCard = new EventEmitter<any>();
  imgURL: string;
  constructor() { }

  ngOnInit() {
    this.imgURL = this.forecastData.forecast[0].weather[0].icon.slice(0, -1);
  }

  close(){
    console.log(`emitting ${this.forecastData.city.id}`)
    this.closeCard.emit(this.forecastData.city.id);
  }

}
