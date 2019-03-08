import { Component, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NgControl } from '@angular/forms';
import { MatRadioChange } from '@angular/material';
import { RadioGroupFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent extends FieldBase {
  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: RadioGroupFieldInfo;

  change(newValue: MatRadioChange) {
    this.innerValue = newValue.value;
    this.onChangedCallback(newValue.value);
  }

}
