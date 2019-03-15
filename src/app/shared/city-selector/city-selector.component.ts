import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';



@Component({
  selector: 'PWA-weather-city-selector',
  templateUrl: './city-selector.component.html',
  styleUrls: ['./city-selector.component.scss']
})
export class CitySelectorComponent implements OnInit {

  cityForm: FormGroup;


  cities: any[] = [
    { value: 2357536, viewValue: 'New York' },
    { value: 2353426, viewValue: 'Chicago' },
    { value: 2352346, viewValue: 'London' },
    { value: 2654536, viewValue: 'Madrid' },
    { value: 2345336, viewValue: 'Paris' },
  ];


  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CitySelectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.cityForm = this.fb.group({
      city: ['', Validators.required]
    })
  }

  close(): void {
    this.dialogRef.close();
  }

}

