import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { FieldBase } from '../base-field';
import { distinctUntilChanged } from 'rxjs/operators';
import { FieldInfo, DynamicFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-table-base-dynamic-field',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicComponent),
      multi: true
    }
  ]
})
export class DynamicComponent extends FieldBase {
  constructor(private builder: FormBuilder) {
    super();
  }

  @Input()
  field: DynamicFieldInfo;

  form: FormGroup;
  items: FormArray;

  writeValue(value: Array<any>): void {
    this.createForm();
    if (!value) {
      this.items.push(this.createNew());
    } else {
      value.map((item: any) => this.items.push(this.createNew(item)));
    }

    this.form.valueChanges.pipe(
      distinctUntilChanged()
    ).subscribe((val) => {
      if (this.form.valid) {
        this.onChangedCallback(val.items);
      } else {
        this.onChangedCallback('');
      }
    });
  }

  add() {
    const items = this.form.get('items') as FormArray;
    items.push(this.createNew());
  }

  delete(index: number) {
    const items = this.form.get('items') as FormArray;
    items.removeAt(index);
  }

  private createForm() {
    this.form = this.builder.group({
      items: this.builder.array([])
    });

    this.items = this.form.get('items') as FormArray;
  }

  private createNew(item: any = null): FormGroup {
    const group = this.field.innerFields.reduce((acc, field: FieldInfo) => {
      const control = {};
      control[field.name] = [item ? item[field.name] : (field.defaultValue ? field.defaultValue : '')];
      return Object.assign({}, acc, control);
    }, {});

    return this.builder.group({
      ...group
    });
  }
}
