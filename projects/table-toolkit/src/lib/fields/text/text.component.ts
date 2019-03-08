import { Component, Input, OnInit } from '@angular/core';
import { FieldBase } from '../base-field';
import { TextFieldInfo } from '../../field-info';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'bp-text-field',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextFieldComponent extends FieldBase implements OnInit {
  constructor(private ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: TextFieldInfo;

  writeValue(incommingValue: string) {
    this.innerValue = incommingValue ? incommingValue : '';
  }

  change(newValue: string): void {
    this.innerValue = newValue;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
