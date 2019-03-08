import { Component, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NgControl } from '@angular/forms';
import { NumberFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-number-field',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss']
})
export class NumberComponent extends FieldBase {
  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: NumberFieldInfo;

  change(newValue: number): void {
    this.innerValue = newValue;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
