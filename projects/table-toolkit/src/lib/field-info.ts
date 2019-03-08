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

export abstract class FieldInfo {
  constructor(label: string, name: string, type: ColumnType) {
    this._label = label;
    this._name = name;
    this._type = type;
  }

  protected _label: string;
  protected _name: string;
  protected _type: ColumnType;
  protected _pipe: PipeTransform = null;
  protected _isReadOnly = false;
  protected _hideInTable = false;
  protected _hideInEditor = false;
  protected _defaultValue = null;
  protected _minWidth = 120;
  protected _naLabel = ' - ';
  protected _options: Array<SelectModel> = [];
  protected _innerFields: Array<FieldInfo> = [];
  protected _decimals = 0;
  protected _flattened = true;
  protected _dateFormat = 'dd/MM/yyyy';
  protected _validators: Array<ValidatorFn> = [];
  protected _showOperator = false;
  protected _trueLabel = 'Yes';
  protected _falseLabel = 'No';

  get label(): string { return this._label; }
  get name(): string { return this._name; }
  get type(): ColumnType { return this._type; }
  get pipe(): PipeTransform { return this._pipe; }
  get isReadOnly(): boolean { return this._isReadOnly; }
  get hideInTable(): boolean { return this._hideInTable; }
  get hideInEditor(): boolean { return this._hideInEditor; }
  get defaultValue(): any { return this._defaultValue; }
  get minWidth(): number { return this._minWidth; }
  get naLabel(): string { return this._naLabel; }
  get options(): Array<SelectModel> { return this._options; }
  get innerFields(): Array<FieldInfo> { return this._innerFields; }
  get decimals(): number { return this._decimals; }
  get flattened(): boolean { return this._flattened; }
  get dateFormat(): string { return this._dateFormat; }
  get validators(): Array<ValidatorFn> { return this._validators; }
  get showOperator(): boolean { return this._showOperator; }
  get trueLabel(): string { return this._trueLabel; }
  get falseLabel(): string { return this._falseLabel; }

  hiddenInTable(): FieldInfo {
    this._hideInTable = true;
    return this;
  }

  hiddenInEditor(): FieldInfo {
    this._hideInEditor = true;
    return this;
  }

  withDefaultValue(value: any): FieldInfo {
    this._defaultValue = value;
    return this;
  }

  readonly(): FieldInfo {
    this._isReadOnly = true;
    return this;
  }

  required(): FieldInfo {
    this._validators.push(Validators.required);
    return this;
  }

  withPipe(pipe: PipeTransform): FieldInfo {
    this._pipe = pipe;
    return this;
  }

  withValidators(validator: ValidatorFn | Array<ValidatorFn>) {
    if (isArray(validator)) {
      this._validators.push(...(validator as Array<ValidatorFn>));
    } else {
      this._validators.push(validator as ValidatorFn);
    }

    return this;
  }

  withNaLabel(label: string): FieldInfo {
    this._naLabel = label;
    return this;
  }

  withMinWidth(pixels: number): FieldInfo {
    this._minWidth = pixels;
    return this;
  }
}

export class TextFieldInfo extends FieldInfo {
  protected _defaultValue = '';

  constructor(label: string, name: string) {
    super(label, name, ColumnType.text);
  }

  required(): TextFieldInfo {
    this._validators.push(Validators.required);
    return this;
  }

  minlength(length: number): TextFieldInfo {
    this._validators.push(Validators.minLength(length));
    return this;
  }

  maxlength(length: number): TextFieldInfo {
    this._validators.push(Validators.maxLength(length));
    return this;
  }

  withOperator(): TextFieldInfo {
    this._showOperator = true;
    return this;
  }

  withDefaultValue(value: string): TextFieldInfo {
    this._defaultValue = value;
    return this;
  }
}

export class AutoCompleteFieldInfo extends FieldInfo {
  protected _defaultValue = '';

  constructor(label: string, name: string) {
    super(label, name, ColumnType.autocomplete);
  }

  withOptions(options: Array<SelectModel>): AutoCompleteFieldInfo {
    this._options = options;
    return this;
  }

  withOperator(): AutoCompleteFieldInfo {
    this._showOperator = true;
    return this;
  }
}

export class NumberFieldInfo extends FieldInfo {
  constructor(label: string, name: string) {
    super(label, name, ColumnType.number);
  }

  min(min: number): FieldInfo {
    this._validators.push(Validators.min(min));
    return this;
  }

  max(max: number): FieldInfo {
    this._validators.push(Validators.max(max));
    return this;
  }

  withDecimals(noOfDecimals: number): FieldInfo {
    this._decimals = noOfDecimals;
    return this;
  }

  withOperator(): FieldInfo {
    this._showOperator = true;
    return this;
  }

  withDefaultValue(value: number): FieldInfo {
    this._defaultValue = value;
    return this;
  }
}

export class DateFieldInfo extends FieldInfo {
  constructor(label: string, name: string) {
    super(label, name, ColumnType.date);
  }

  withDateFormat(format: string): DateFieldInfo {
    this._dateFormat = format;
    return this;
  }

  withOperator(): DateFieldInfo {
    this._showOperator = true;
    return this;
  }

  withDefaultValue(value: Date): DateFieldInfo {
    this._defaultValue = value;
    return this;
  }
}

export class SelectFieldInfo extends FieldInfo {
  constructor(label: string, name: string) {
    super(label, name, ColumnType.select);
  }

  withOptions(options: Array<SelectModel>): SelectFieldInfo {
    this._options = options;
    return this;
  }

  withOperator(): SelectFieldInfo {
    this._showOperator = true;
    return this;
  }
}

export class MultipleFieldInfo extends FieldInfo {
  protected _defaultValue = [];

  constructor(label: string, name: string) {
    super(label, name, ColumnType.multiple);
  }

  withOptions(options: Array<SelectModel>): MultipleFieldInfo {
    this._options = options;
    return this;
  }

  withOperator(): MultipleFieldInfo {
    this._showOperator = true;
    return this;
  }

  withDefaultValue(value: Array<any>): MultipleFieldInfo {
    this._defaultValue = value;
    return this;
  }
}

export class RadioGroupFieldInfo extends FieldInfo {
  constructor(label: string, name: string) {
    super(label, name, ColumnType.radioGroup);
  }

  withOptions(options: Array<SelectModel>): RadioGroupFieldInfo {
    this._options = options;
    return this;
  }
}

export class CheckboxFieldInfo extends FieldInfo {
  protected _defaultValue = false;

  constructor(label: string, name: string) {
    super(label, name, ColumnType.checkbox);
  }

  withTrueLabel(label: string): CheckboxFieldInfo {
    this._trueLabel = label;
    return this;
  }

  withfalseLabel(label: string): CheckboxFieldInfo {
    this._falseLabel = label;
    return this;
  }

  withDefaultValue(value: boolean): CheckboxFieldInfo {
    this._defaultValue = value;
    return this;
  }
}

export class DynamicFieldInfo extends FieldInfo {
  protected _defaultValue = [];

  constructor(label: string, name: string) {
    super(label, name, ColumnType.dynamic);
  }

  withInnerFields(fields: Array<FieldInfo>): DynamicFieldInfo {
    this._innerFields = fields;
    return this;
  }

  withDefaultValue(value: Array<any>): DynamicFieldInfo {
    this._defaultValue = value;
    return this;
  }
}

export class ContainerFieldInfo extends FieldInfo {
  protected _defaultValue = {};

  constructor(label: string, name: string) {
    super(label, name, ColumnType.container);
  }

  withInnerFields(fields: Array<FieldInfo>): ContainerFieldInfo {
    this._innerFields = fields;
    return this;
  }

  unflattened(): ContainerFieldInfo {
    this._flattened = false;
    return this;
  }
}
