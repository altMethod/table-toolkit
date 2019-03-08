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

  onSave() {
    const model = this.fields.reduce((acc: any, current: FieldInfo) => {
      if (current.type !== ColumnType.container || (current.type === ColumnType.container) && !current.flattened) {
        return { ...acc, [current.name]: this.form.get(current.name).value };
      }

      if (current.type === ColumnType.container && current.flattened) {
        const containerValue = current.innerFields.reduce((innerAcc: any, innerCurrent: FieldInfo) => {
          const innerValue = this.form.get(current.name).value[innerCurrent.name];
          return { ...innerAcc, [innerCurrent.name]: innerValue };
        }, {});
        return { ...acc, ...containerValue };
      }
    }, {});
    this.save.emit(model);
  }

  private createControl(field: FieldInfo): AbstractControl {
    let value = isNotNullOrUndefined(this.innerModel[field.name]) ? this.innerModel[field.name] : field.defaultValue;

    if (field.type === ColumnType.container) {
      if (field.flattened) {
        value = field.innerFields.reduce((acc: any, current: FieldInfo) => {
          const initialValue = isNotNullOrUndefined(this.innerModel[current.name]) ?
            this.innerModel[current.name] : current.defaultValue;
          return Object.assign(acc, { [current.name]: initialValue });
        }, {});
      }
    }

    const disabled = field.isReadOnly ? true : false;
    return new FormControl({ value, disabled }, Validators.compose(field.validators));
  }
}
