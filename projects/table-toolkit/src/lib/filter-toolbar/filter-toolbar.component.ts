import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FieldInfo, ColumnType } from '../field-info';
import { TableBaseFilter } from '../table.model';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'bp-filter-toolbar',
  templateUrl: './filter-toolbar.component.html',
  styleUrls: ['./filter-toolbar.component.scss']
})
export class FilterToolbarComponent implements OnInit {

  constructor() { }

  @Input()
  filter: TableBaseFilter;

  @Input()
  fields: Array<FieldInfo>;

  @Output()
  filterData: EventEmitter<any> = new EventEmitter();

  localFilter: TableBaseFilter;
  appliedFilters: Array<FieldInfo> = [];
  remainingFilters: Array<FieldInfo> = [];

  form = new FormGroup({});

  ngOnInit() {
    this.localFilter = { ...this.filter };
    this.form = this.createForm();
    this.setRemainingFilters();
  }

  onFilter() {
    this.filterData.emit({
      ...this.localFilter,
      ...this.form.value
    });
  }

  addFilter(filter: FieldInfo) {
    this.appliedFilters.push(filter);

    const index = this.remainingFilters.findIndex(f => f.name === filter.name);
    this.remainingFilters.splice(index, 1);
  }

  removeFilter(filter: FieldInfo) {
    const index = this.appliedFilters.findIndex(f => f.name === filter.name);
    this.appliedFilters.splice(index, 1);
    this.setRemainingFilters();
    this.clearFieldValue(filter);
  }

  getFormControl(field: FieldInfo) {
    if (field.parent && !field.parent.flattened) {
      return this.form.get(field.parent.name).get(field.name);
    }
    return this.form.get(field.name);
  }

  private createForm(): FormGroup {
    const form = new FormGroup({});

    this.fields.map((field: FieldInfo) => {
      if (field.type === ColumnType.container) {
        if (field.flattened) {
          field.innerFields.map((innerField: FieldInfo) => {
            const value = this.getFieldValue(innerField);
            form.addControl(innerField.name, new FormControl(value));
          });
        } else {
          form.addControl(field.name, new FormGroup({}));
          field.innerFields.map((innerField: FieldInfo) => {
            const value = this.getFieldValue(innerField);
            (form.get(field.name) as FormGroup).addControl(innerField.name, new FormControl(value));
          });
        }
      } else {
        const value = this.getFieldValue(field);
        form.addControl(field.name, new FormControl(value));
      }
    });

    return form;
  }

  private getFieldValue(field: FieldInfo): any {
    if (field.parent) {
      if (field.parent.flattened) {
        return this.filter && this.filter[field.name] ? this.filter[field.name] : null;
      } else {
        if (!field.parent.flattened) {
          return this.filter && this.filter[field.parent.name] && this.filter[field.parent.name][field.name]
            ? this.filter[field.parent.name][field.name] : null;
        }
      }
    }
    return this.filter && this.filter[field.name] ? this.filter[field.name] : null;
  }

  private clearFieldValue(field: FieldInfo): void {
    if (field.parent && !field.parent.flattened) {
      this.form.get(field.parent.name).get(field.name).setValue('');
    } else {
      this.form.get(field.name).setValue('');
    }
  }

  private setRemainingFilters(): void {
    this.remainingFilters = this.fields.reduce((acc: Array<FieldInfo>, current: FieldInfo) => {
      if (current.type === ColumnType.container) {
        return acc.concat(current.innerFields);
      }

      if (current.type !== ColumnType.dynamic) {
        return acc.concat(current);
      }

      return acc;
    }, []).filter(f => !this.appliedFilters.find(e => e.name === f.name));
  }
}
