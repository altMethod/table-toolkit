import { ControlValueAccessor, AbstractControl, NgControl } from '@angular/forms';
import { OnInit } from '@angular/core';

export class FieldBase implements ControlValueAccessor, OnInit {
  constructor(ngControl: NgControl) {
    ngControl.valueAccessor = this;
    this.ngControl = ngControl;
  }

  protected onChangedCallback: (_: any) => void;
  protected onTouchedCallback: (_: any) => void;
  protected ngControl: NgControl;
  protected control: AbstractControl;

  operator = '=';
  disabled = false;
  innerValue: any;

  ngOnInit() {
    this.control = this.ngControl.control;
  }

  onChangeCallbackWrapper(showOperator = false) {
    const value = this.control ? this.control.value : this.innerValue;
    if (showOperator) {
      this.onChangedCallback({
        value,
        operator: this.operator
      });
    } else {
      this.onChangedCallback(value);
    }
  }

  // ControlValueAccessor
  writeValue(incommingValue: any) { this.innerValue = incommingValue; }
  registerOnChange(fn: any): void { this.onChangedCallback = fn; }
  registerOnTouched(fn: any): void { this.onTouchedCallback = fn; }
  setDisabledState(isDisabled: boolean): void { this.disabled = isDisabled; }
  change(newValue: any): void {
    this.innerValue = newValue;
    this.onChangedCallback(newValue);
  }
}
