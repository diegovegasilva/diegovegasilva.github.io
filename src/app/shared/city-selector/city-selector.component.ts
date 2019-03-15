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
    { value: 5128638, viewValue: 'New York' },
    { value: 4887398, viewValue: 'Chicago' },
    { value: 2643744, viewValue: 'London' },
    { value: 4865871, viewValue: 'Madrid' },
    { value: 2988507, viewValue: 'Paris' },
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

