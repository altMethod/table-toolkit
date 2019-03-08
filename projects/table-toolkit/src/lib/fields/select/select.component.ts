import { Component, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { MatSelectChange } from '@angular/material';
import { NgControl } from '@angular/forms';
import { SelectFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-select-field',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent extends FieldBase {
  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: SelectFieldInfo;

  change(newValue: MatSelectChange): void {
    this.innerValue = newValue.value;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
