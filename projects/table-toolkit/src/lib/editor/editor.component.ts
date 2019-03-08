import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldInfo, ColumnType } from '../field-info';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import { isNotNullOrUndefined } from '../utils';

@Component({
  selector: 'bp-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
  constructor(private builder: FormBuilder) { }

  @Input()
  fields: Array<FieldInfo>;

  @Input()
  model: any;

  @Input()
  saveLabel: string;

  @Input()
  cancelLabel: string;

  @Input()
  formValidator: ValidatorFn;

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  form: FormGroup = new FormGroup({});
  innerModel = {};

  ngOnInit() {
    if (this.model) {
      this.innerModel = this.model;
    }
    this.createForm();
  }

  private createForm() {
    this.form = this.builder.group({}, { validators: this.formValidator });
    this.fields.map((field: FieldInfo) => this.form.addControl(field.name, this.createControl(field)));
  }

  private createControl(field: FieldInfo): AbstractControl {
    let value = isNotNullOrUndefined(this.innerModel[field.name]) ? this.innerModel[field.name] : field.defaultValue;
    if (field.type === ColumnType.container) {
      if (field.flattened) {
        value = field.innerFields.reduce((acc: any, current: FieldInfo) =>
          Object.assign(acc, {
            [current.name]: isNotNullOrUndefined(this.innerModel[current.name]) ?
              this.innerModel[current.name] : current.defaultValue
          }), {});
      }
    }

    const disabled = field.isReadOnly ? true : false;
    return new FormControl({ value, disabled }, Validators.compose(field.validators));
  }
}
