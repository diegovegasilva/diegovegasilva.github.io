import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'PWA-weather-notification-promt',
  templateUrl: './notification-promt.component.html',
  styleUrls: ['./notification-promt.component.scss']
})
export class NotificationPromtComponent implements OnInit {

  notificationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<NotificationPromtComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.notificationForm = this.fb.group({
      name: ['', Validators.required]
    })
  }

  close(): void {
    this.dialogRef.close();
  }

  submit(): void {
    if (this.notificationForm.valid) {
      this.dialogRef.close(this.notificationForm.value.name);
    }
  }

}
