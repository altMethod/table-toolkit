import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'bp-modal-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class TableBaseModalConfirmComponent {
  constructor(public dialogRef: MatDialogRef<TableBaseModalConfirmComponent>, @Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    message: string,
    yesLabel: string,
    noLabel: string
  }) { }
}

