import { Component, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { MatSelectChange } from '@angular/material';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-select-field',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true
    }
  ]
})
export class SelectComponent extends FieldBase {
  constructor() { super(); }

  @Input()
  field: SelectFieldInfo;

  change(newValue: MatSelectChange): void {
    this.innerValue = newValue.value;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
