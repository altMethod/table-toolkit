import { ControlValueAccessor } from '@angular/forms';

export class FieldBase implements ControlValueAccessor {
  constructor() { }

  protected onChangedCallback: (_: any) => void;
  protected onTouchedCallback: (_: any) => void;

  operator = '=';
  disabled = false;
  innerValue: any;

  onChangeCallbackWrapper(showOperator = false) {
    if (showOperator) {
      this.onChangedCallback({
        value: this.innerValue,
        operator: this.operator
      });
    } else {
      this.onChangedCallback(this.innerValue);
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
