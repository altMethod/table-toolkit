import { Component, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgControl } from '@angular/forms';
import { FieldBase } from '../base-field';
import { FieldInfo, ContainerFieldInfo } from '../../field-info';
import { isNotNullOrUndefined } from '../../utils';

@Component({
  selector: 'bp-container-field',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent extends FieldBase implements AfterContentInit {

  constructor(ctrl: NgControl) {
    super(ctrl);
  }

  @Input()
  field: ContainerFieldInfo;

  form: FormGroup;

  ngAfterContentInit() {
    this.createForm();
  }

  private createForm() {
    this.form = new FormGroup({});
    this.field.innerFields.map((field: FieldInfo) => {
      const disabled = field.isReadOnly ? true : false;
      const controlValue = this.control.value[field.name];

      const value = isNotNullOrUndefined(controlValue)
        ? controlValue : field.defaultValue;
      const control = new FormControl({ value, disabled }, Validators.compose(field.validators));
      this.form.addControl(field.name, control);
    });

    this.form.valueChanges.subscribe(() => {
      if (this.onChangedCallback) {
        this.onChangedCallback(this.form.value);
      }
    });
  }
}
