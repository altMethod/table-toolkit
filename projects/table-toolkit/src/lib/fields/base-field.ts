import { ControlValueAccessor } from '@angular/forms';
import { Input } from '@angular/core';
import { FieldInfo } from '../field-info';

export class FieldBase implements ControlValueAccessor {
  constructor() { }

  @Input()
  field: FieldInfo;

  protected onChangedCallback: (_: any) => void;
  protected onTouchedCallback: (_: any) => void;
  disabled = false;
  innerValue: any;

  // ControlValueAccessor
  change(newValue: any): void {
    this.onChangedCallback(newValue);
    this.innerValue = newValue;
  }
  writeValue(incommingValue: any) { this.innerValue = incommingValue; }
  registerOnChange(fn: any): void { this.onChangedCallback = fn; }
  registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
}
