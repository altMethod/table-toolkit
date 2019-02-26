import { ValidatorFn, Validators } from '@angular/forms';
import { PipeTransform } from '@angular/core';
import { isArray } from 'util';

export enum ColumnType {
  autocomplete = 'autocomplete',
  checkbox = 'checkbox',
  dynamic = 'dynamic',
  text = 'text',
  select = 'select',
  date = 'date',
  radioGroup = 'radioGroup',
  number = 'number',
  multiple = 'multiple',
  dateRange = 'dateRange',
  container = 'container'
}

export class SelectModel {
  constructor(public label: string, public value: any) { }
}

export class FieldInfo {
  constructor(public label: string, public name: string, public type: ColumnType) { }

  pipe: PipeTransform = null;
  options: Array<SelectModel> = [];
  naLabel = ' - ';
  decimals = 0;
  minWidth = 120;
  flattened = true;
  dateFormat = 'dd/MM/yyyy';
  isReadOnly = false;
  validators: Array<ValidatorFn> = [];
  hideInTable = false;
  innerFields: Array<FieldInfo> = [];
  hideInEditor = false;
  defaultValue = null;
  showOperator = false;
  checkboxTrueLabel = 'Yes';
  checkboxFalseLabel = 'No';

  hiddenInTable(): FieldInfo {
    this.hideInTable = true;
    return this;
  }

  hiddenInEditor(): FieldInfo {
    this.hideInEditor = true;
    return this;
  }

  withDefaultValue(value: any): FieldInfo {
    this.defaultValue = value;
    return this;
  }

  readonly(): FieldInfo {
    this.isReadOnly = true;
    return this;
  }

  required(): FieldInfo {
    this.validators.push(Validators.required);
    return this;
  }

  withPipe(pipe: PipeTransform): FieldInfo {
    this.pipe = pipe;
    return this;
  }

  withValidators(validator: ValidatorFn | Array<ValidatorFn>) {
    if (isArray(validator)) {
      this.validators.push(...(validator as Array<ValidatorFn>));
    } else {
      this.validators.push(validator as ValidatorFn);
    }

    return this;
  }

  withNaLabel(label: string): FieldInfo {
    this.naLabel = label;
    return this;
  }

  withMinWidth(pixels: number): FieldInfo {
    this.minWidth = pixels;
    return this;
  }
}

export class TextFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.text);
  }

  minlength(length: number): TextFieldInfo {
    this.validators.push(Validators.minLength(length));
    return this;
  }

  maxlength(length: number): TextFieldInfo {
    this.validators.push(Validators.maxLength(length));
    return this;
  }

  withOperator(): TextFieldInfo {
    this.showOperator = true;
    return this;
  }

  withDefaultValue(value: string): TextFieldInfo {
    this.defaultValue = value;
    return this;
  }
}

export class AutoCompleteFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.autocomplete);
  }

  withOptions(options: Array<SelectModel>): AutoCompleteFieldInfo {
    this.options = options;
    return this;
  }

  withOperator(): AutoCompleteFieldInfo {
    this.showOperator = true;
    return this;
  }
}

export class NumberFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.number);
  }

  min(min: number): FieldInfo {
    this.validators.push(Validators.min(min));
    return this;
  }

  max(max: number): FieldInfo {
    this.validators.push(Validators.max(max));
    return this;
  }

  withDecimals(noOfDecimals: number): FieldInfo {
    this.decimals = noOfDecimals;
    return this;
  }

  withOperator(): FieldInfo {
    this.showOperator = true;
    return this;
  }

  withDefaultValue(value: number): FieldInfo {
    this.defaultValue = value;
    return this;
  }
}

export class DateFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.date);
  }

  withDateFormat(format: string): DateFieldInfo {
    this.dateFormat = format;
    return this;
  }

  withOperator(): DateFieldInfo {
    this.showOperator = true;
    return this;
  }

  withDefaultValue(value: Date): DateFieldInfo {
    this.defaultValue = value;
    return this;
  }
}

export class SelectFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.select);
  }

  withOptions(options: Array<SelectModel>): SelectFieldInfo {
    this.options = options;
    return this;
  }

  withOperator(): SelectFieldInfo {
    this.showOperator = true;
    return this;
  }
}

export class MultipleFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.multiple);
  }

  withOptions(options: Array<SelectModel>): MultipleFieldInfo {
    this.options = options;
    return this;
  }

  withOperator(): MultipleFieldInfo {
    this.showOperator = true;
    return this;
  }

  withDefaultValue(value: Array<any>): MultipleFieldInfo {
    this.defaultValue = value;
    return this;
  }
}

export class RadioGroupFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.radioGroup);
  }

  withOptions(options: Array<SelectModel>): RadioGroupFieldInfo {
    this.options = options;
    return this;
  }
}

export class CheckboxFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.checkbox);
  }

  withCheckboxTrueLabel(label: string): CheckboxFieldInfo {
    this.checkboxTrueLabel = label;
    return this;
  }

  withCheckboxFalseLabel(label: string): CheckboxFieldInfo {
    this.checkboxFalseLabel = label;
    return this;
  }

  withDefaultValue(value: boolean): CheckboxFieldInfo {
    this.defaultValue = value;
    return this;
  }
}

export class DynamicFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.dynamic);
  }

  withInnerFields(fields: Array<FieldInfo>): DynamicFieldInfo {
    this.innerFields = fields;
    return this;
  }

  withDefaultValue(value: Array<any>): DynamicFieldInfo {
    this.defaultValue = value;
    return this;
  }
}

export class ContainerFieldInfo extends FieldInfo {
  constructor(public label: string, public name: string) {
    super(label, name, ColumnType.container);
  }

  withInnerFields(fields: Array<FieldInfo>): ContainerFieldInfo {
    this.innerFields = fields;
    return this;
  }

  unflattened(): ContainerFieldInfo {
    this.flattened = false;
    return this;
  }
}
