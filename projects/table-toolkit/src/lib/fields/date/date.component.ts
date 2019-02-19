import { Component, forwardRef } from '@angular/core';
import { FieldBase } from '../base-field';
import { MatDatepickerInputEvent } from '@angular/material';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bp-table-base-date-field',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent extends FieldBase {
  constructor() { super(); }

  change(newValue: MatDatepickerInputEvent<Date>): void {
    this.innerValue = this.formatDate(newValue.value, 'd/m/y');
    this.onChangedCallback(this.innerValue);
  }

  private formatDate(date: Date, format: string): string {
    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    const year = date.getFullYear().toString();
    format.replace('d', day);
    format.replace('m', month);
    format.replace('y', year);
    return format;
  }
}
