import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'PWA-weather-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() addCity = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  refresh(){}

  add(){
    this.addCity.emit();
  }

}
