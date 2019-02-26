import { Component, forwardRef, Input } from '@angular/core';
import { FieldBase } from '../base-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-table-base-text-field',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TextFieldComponent),
      multi: true
    }
  ]
})
export class TextFieldComponent extends FieldBase {
  constructor() { super(); }

  @Input()
  field: TextFieldInfo;

  change(newValue: string): void {
    this.innerValue = newValue;
    this.onChangeCallbackWrapper(this.field.showOperator);
  }
}
