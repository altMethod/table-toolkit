import { Component, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NgControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material';
import { CheckboxFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-checkbox-field',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent extends FieldBase {

  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: CheckboxFieldInfo;

  change(event: MatCheckboxChange) {
    this.onChangedCallback(event.checked);
  }
}
