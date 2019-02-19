import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldInfo } from '../field-info';
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'bp-table-base-editor',
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

  @Output()
  save: EventEmitter<any> = new EventEmitter();

  @Output()
  cancel: EventEmitter<void> = new EventEmitter();

  form: FormGroup = new FormGroup({});

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.form = this.builder.group({});
    this.fields.map((field: FieldInfo) => this.form.addControl(field.name, this.createControl(field)));
  }

  private createControl(field: FieldInfo): AbstractControl {
    const value = this.model[field.name] !== null ? this.model[field.name] : field.defaultValue;
    const disabled = field.isReadOnly ? true : false;
    return new FormControl({ value, disabled }, field.validators);
  }
}
