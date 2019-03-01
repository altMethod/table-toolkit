import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FieldBase } from '../base-field';
import { Observable } from 'rxjs';
import { SelectModel, AutoCompleteFieldInfo } from '../../field-info';
import { startWith, map } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material';

@Component({
  selector: 'bp-autocomplete-field',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutocompleteComponent),
      multi: true
    }
  ]
})
export class AutocompleteComponent extends FieldBase {

  @Input()
  field: AutoCompleteFieldInfo;

  constructor() {
    super();
    this.filteredOptions = this.control.valueChanges
      .pipe(
        startWith(''),
        map(value => value ? this.filter(value) : this.field.options)
      );
  }

  innerValue: string;
  control: FormControl = new FormControl();
  filteredOptions: Observable<Array<SelectModel>>;

  filter(value: string | SelectModel): Array<SelectModel> {
    if (value) {
      return this.field.options.filter(option => {
        if (value instanceof SelectModel) {
          return (option.label.toLowerCase().indexOf(value.label.toLowerCase()) > -1);
        } else {
          return (option.label.toLowerCase().indexOf(value.toLowerCase()) > -1);
        }
      });
    }
    return this.field.options;
  }

  writeValue(incommingValue: any): void {
    if (incommingValue && incommingValue.operator) {
      this.control.setValue(incommingValue.value);
      this.operator = incommingValue.operator;
    } else {
      this.control.setValue(incommingValue);
    }
  }

  optionSelected(optionEvent: MatAutocompleteSelectedEvent) {
    const option = optionEvent.option.value as SelectModel;
    this.innerValue = option.value;
    this.control.setValue(option.label);
    this.onChangeCallbackWrapper(this.field.showOperator);
  }

  operatorChanged() {
    this.onChangeCallbackWrapper(true);
  }
}
