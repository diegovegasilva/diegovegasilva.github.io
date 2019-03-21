import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'PWA-weather-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @Input() users: Array<any>
  constructor() { }

  ngOnInit() {
  }

}
