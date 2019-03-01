import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { FieldInfo, ColumnType, DateFieldInfo } from '../../field-info';
import { FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bp-date-range-field',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateRangeComponent),
      multi: true
    }
  ]
})
export class DateRangeComponent extends FieldBase {
  constructor() {
    super();
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
