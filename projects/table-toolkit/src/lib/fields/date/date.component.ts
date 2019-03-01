import { Component, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { MatDatepickerInputEvent } from '@angular/material';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-date-field',
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

  @Input()
  field: DateFieldInfo;

  change(newValue: MatDatepickerInputEvent<Date>): void {
    this.innerValue = newValue.value;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
