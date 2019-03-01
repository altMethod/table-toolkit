import { Component, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NumberFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-number-field',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberComponent),
      multi: true
    }
  ]
})
export class NumberComponent extends FieldBase {
  constructor() { super(); }

  @Input()
  field: NumberFieldInfo;

  change(newValue: number): void {
    this.innerValue = newValue;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
