import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators } from '@angular/forms';
import { FieldBase } from '../base-field';
import { FieldInfo, ContainerFieldInfo } from '../../field-info';

@Component({
  selector: 'bp-container-field',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContainerComponent),
      multi: true
    }
  ]
})
export class ContainerComponent extends FieldBase implements OnInit {
  constructor() {
    super();
  }

  @Input()
  field: ContainerFieldInfo;

  form = new FormGroup({});

  ngOnInit() {
    this.createForm();
  }

  write(incommingValue: any) {
    this.form.setValue(incommingValue);
  }

  private createForm() {
    this.field.innerFields.map((field: FieldInfo) => {
      const control = new FormControl('', Validators.compose(field.validators));
      this.form.addControl(field.name, control);
    });

    this.form.valueChanges.subscribe(() => this.onChangedCallback(this.form.value));
  }
}
