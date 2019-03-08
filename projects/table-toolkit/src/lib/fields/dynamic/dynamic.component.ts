import { Component, Input, AfterContentInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, NgControl } from '@angular/forms';
import { FieldBase } from '../base-field';
import { distinctUntilChanged } from 'rxjs/operators';
import { FieldInfo, DynamicFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-dynamic-field',
  templateUrl: './dynamic.component.html',
  styleUrls: ['./dynamic.component.scss']
})
export class DynamicComponent extends FieldBase implements AfterContentInit {
  constructor(private builder: FormBuilder, ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: DynamicFieldInfo;

  form: FormGroup;
  items: FormArray;

  ngAfterContentInit() {
    const value = this.ngControl.value;
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
