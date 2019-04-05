import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'PWA-weather-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() addCity = new EventEmitter<any>();
  @Output() subscribe = new EventEmitter<any>();
  @Output() refreshData = new EventEmitter<any>();
  @Input() selectedCities: number[];
  @Input() token: string;

  constructor() { }

  ngOnInit() {
  }

  refresh() {
    this.refreshData.emit(this.selectedCities);
  }

  add() {
    this.addCity.emit();
  }

  subscribeNotification() {
    this.subscribe.emit(true);
  }

  desubscribeNotification(){
    this.subscribe.emit(false)
  }

}
