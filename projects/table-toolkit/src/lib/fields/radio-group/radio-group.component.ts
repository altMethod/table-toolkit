import { Component, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { RadioGroupFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-table-base-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true
    }
  ]
})
export class RadioGroupComponent extends FieldBase {
  constructor() { super(); }

  @Input()
  field: RadioGroupFieldInfo;

  change(newValue: MatRadioChange) {
    this.innerValue = newValue.value;
    this.onChangedCallback(newValue.value);
  }

}
