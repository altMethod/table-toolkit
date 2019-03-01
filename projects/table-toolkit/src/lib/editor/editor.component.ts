import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldInfo } from '../field-info';
import { FormGroup, FormControl, FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';

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
    const value = this.innerModel[field.name] !== null ? this.innerModel[field.name] : field.defaultValue;
    const disabled = field.isReadOnly ? true : false;
    return new FormControl({ value, disabled }, field.validators);
  }
}
