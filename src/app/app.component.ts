import { Component } from '@angular/core';

import {MatDialog} from '@angular/material';
import { CitySelectorComponent } from './shared/city-selector/city-selector.component';

@Component({
  selector: 'PWA-weather-root',
  templateUrl: './app.component.html',
  styles: []
})
export class AppComponent {
  title = 'PWA-weather-app';

  constructor(public dialog: MatDialog){}

  openDialog(): void {
    const dialogRef = this.dialog.open(CitySelectorComponent, {
      width: '250px',
      data: { name: 'pwpw', animal: 'pepe' }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);

    });
  }
}
