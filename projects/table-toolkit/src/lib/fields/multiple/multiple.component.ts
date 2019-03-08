import { Component, forwardRef, Input, OnInit, ViewChild, ElementRef, Injector } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl, NgControl } from '@angular/forms';
import { FieldBase } from '../base-field';
import { MultipleFieldInfo } from '../../field-info';
import { SelectModel } from '../../field-info';
import { Observable, of, merge } from 'rxjs';
import { map } from 'rxjs/operators';
import { isArray } from 'util';

@Component({
  selector: 'bp-multiple-field',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.scss']
})
export class MultipleComponent extends FieldBase implements OnInit {
  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: MultipleFieldInfo;

  @ViewChild('input')
  input: ElementRef;

  autocompleteControl: FormControl = new FormControl();

  options: Array<SelectModel> = [];
  innerValue: Array<any> = [];
  innerLabels: Array<string> = [];
  filteredOptions: Observable<Array<SelectModel>>;

  ngOnInit() {
    this.options = [...this.field.options];
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

    this.filteredOptions = merge(
      of(this.filter('')),
      this.autocompleteControl.valueChanges.pipe(
        map((val: any) => this.filter(val))
      )
    );
  }

  filter(value: string | SelectModel): Array<SelectModel> {
    const valueToCompare = (value !== Object(value) ? (value as string) : (value as SelectModel).label).toLowerCase();
    const toReturn = (this.options as Array<SelectModel>)
      .filter(option => {
        const contains = option.label.toLowerCase().indexOf(valueToCompare) > -1;
        const exists = this.innerValue.findIndex(e => e === option.value) > -1;
        return contains && !exists;
      }).sort();
    return toReturn;
  }

  removeSelected(label: any) {
    const option = this.field.options.find(e => e.label === label);

    const valueIndex = this.innerValue.indexOf(option.value);
    this.innerValue.splice(valueIndex, 1);
    const labelIndex = this.innerLabels.indexOf(option.label);
    this.innerLabels.splice(labelIndex, 1);

    if (this.autocompleteControl.value) {
      this.autocompleteControl.setValue('');
    } else {
      this.autocompleteControl.setValue('#');
      this.autocompleteControl.setValue('');
    }
    this.onChangeCallbackWrapper(this.field.showOperator);
  }

  optionSelected(option: SelectModel) {
    this.innerValue.push(option.value);
    this.innerLabels.push(option.label);

    this.options.splice(this.options.findIndex(e => e.value === option.value), 1);
    this.autocompleteControl.setValue('');
    this.onChangeCallbackWrapper(this.field.showOperator);
    this.input.nativeElement.blur();
  }

  operatorChanged() {
    this.onChangeCallbackWrapper(true);
  }
}
