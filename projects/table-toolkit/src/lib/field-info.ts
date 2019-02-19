import { ValidatorFn, Validators } from '@angular/forms';

export enum ColumnType {
  text = 'text',
  select = 'select',
  date = 'date',
  number = 'number',
  dateRange = 'dateRange'
}

export class SelectModel {
  constructor(public label: string, public value: any) { }
}

export class FieldInfo {
  constructor(public label: string, public name: string, public type: ColumnType) { }

  options: Array<SelectModel> = [];
  isReadOnly = false;
  validators: Array<ValidatorFn> = [];
  hideInTable = false;
  hideInEditor = false;
  defaultValue = null;

  withOptions(options: Array<SelectModel>): FieldInfo {
    if (this.type !== ColumnType.select) {
      throw new Error(`Field info with name ${this.name} must have type 'select' in order to have options`);
    }
    this.options = options;
    return this;
  }

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

  minlength(min: number): FieldInfo {
    if (this.type !== ColumnType.number) {
      throw new Error(`Min length cannot be set on FieldInfo of type ${this.type} - must be of type number`);
    }
    this.validators.push(Validators.minLength(min));
    return this;
  }

  maxlength(max: number): FieldInfo {
    if (this.type !== ColumnType.number) {
      throw new Error(`Max length cannot be set on FieldInfo of type ${this.type} - must be of type number`);
    }
    this.validators.push(Validators.minLength(max));
    return this;
  }
}

