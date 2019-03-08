import { Component, forwardRef, Input, Injector } from '@angular/core';
import { FieldBase } from '../base-field';
import { MatDatepickerInputEvent } from '@angular/material';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { DateFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-date-field',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent extends FieldBase {
  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: DateFieldInfo;

  change(newValue: MatDatepickerInputEvent<Date>): void {
    this.control.setValue(newValue.value);
  }
}
