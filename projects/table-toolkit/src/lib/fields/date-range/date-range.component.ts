import { Component, forwardRef, Input, Injector } from '@angular/core';
import { FieldBase } from '../base-field';
import { DateFieldInfo } from '../../field-info';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

@Component({
  selector: 'bp-date-range-field',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent extends FieldBase {
  constructor(ctrl: NgControl) {
    super(ctrl);

    this.form.addControl('from', new FormControl());
    this.form.addControl('to', new FormControl());

    this.form.valueChanges.subscribe(() => this.onChangedCallback(this.form.value));
  }

  @Input()
  field: DateFieldInfo;

  fromField = new DateFieldInfo('from', 'From');
  toField = new DateFieldInfo('to', 'To');
  form = new FormGroup({});

  writeValue(incommingValue: any) {
    this.form.setValue(incommingValue);
  }
}
