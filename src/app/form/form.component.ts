import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TableBaseConfig } from 'projects/table-toolkit/src/';
import { User } from '../table.config';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  constructor(public dialogRef: MatDialogRef<FormComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    config: TableBaseConfig,
    model: User
  }) {
    this.model = { ...data.model };
  }

  model: User;
  save(model: any) {
    this.dialogRef.close(model);
  }

  cancel() {
    this.dialogRef.close();
  }
}
