import { Component, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { CheckboxFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-table-base-checkbox-field',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent extends FieldBase {
  constructor() { super(); }

  @Input()
  field: CheckboxFieldInfo;

  change(event: MatCheckboxChange) {
    this.onChangedCallback(event.checked);
  }
}
