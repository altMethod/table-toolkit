import { Component, forwardRef, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { FieldBase } from '../base-field';
import { MultipleFieldInfo } from '../../field-info';
import { SelectModel } from '../../field-info';
import { Observable, of, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { isArray } from 'util';

@Component({
  selector: 'bp-table-base-multiple-field',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MultipleComponent),
      multi: true
    }
  ]
})
export class MultipleComponent extends FieldBase implements OnInit {
  constructor() { super(); }

  @Input()
  field: MultipleFieldInfo;

  @ViewChild('input')
  input: ElementRef;

  control: FormControl = new FormControl();
  options: Array<SelectModel> = [];
  innerValue: Array<any> = [];
  innerLabels: Array<string> = [];
  filteredOptions: Observable<Array<SelectModel>>;

  ngOnInit() {
    this.options = [...this.field.options];

    this.filteredOptions =
      merge(
        of(this.filter('')),
        this.control.valueChanges.pipe(
          map((val: any) => this.filter(val))
        )
      );
  }

  writeValue(newValue: Array<any> | any) {
    if (!newValue) {
      this.innerValue = [];
      this.innerLabels = [];
    } else {
      if (isArray(newValue)) {
        this.innerValue = newValue as Array<any>;
      } else {
        this.innerValue = newValue.value as Array<any>;
        this.operator = newValue.operator;
      }

      this.innerLabels = this.options.reduce((acc: Array<string>, current: SelectModel) => {
        if (this.innerValue.find(e => e === current.value)) {
          return [...acc, current.label];
        }
        return acc;
      }, []);
    }
  }

  filter(value: string | SelectModel): Array<SelectModel> {
    if (value) {
      const valueToCompare = (value !== Object(value) ? (value as string) : (value as SelectModel).label).toLowerCase();
      const toReturn = (this.options as Array<SelectModel>)
        .filter(option => {
          const contains = option.label.toLowerCase().indexOf(valueToCompare) > -1;
          const exists = this.innerValue.find(e => e.toLowerCase() === valueToCompare) === null;
          return contains && !exists;
        }).sort();
      return toReturn;
    }
    return this.options.sort();
  }

  removeSelected(label: any) {
    const option = this.field.options.find(e => e.label === label);

    const index = this.innerValue.indexOf(option.value);
    this.innerValue.splice(index, 1);
    this.innerLabels.splice(index, 1);
    this.options.push(option);

    this.control.setValue('');
    this.onChangeCallbackWrapper(this.field.showOperator);
  }

  optionSelected(option: SelectModel) {
    this.innerValue.push(option.value);
    this.innerLabels.push(option.label);

    this.options.splice(this.options.findIndex(e => e.value === option.value), 1);
    this.control.setValue('');
    this.onChangeCallbackWrapper(this.field.showOperator);
    this.input.nativeElement.blur();
  }

  operatorChanged() {
    this.onChangeCallbackWrapper(true);
  }
}
