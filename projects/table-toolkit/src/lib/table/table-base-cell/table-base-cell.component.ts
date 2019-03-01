import { Component, Input } from '@angular/core';
import { FieldInfo, SelectFieldInfo, MultipleFieldInfo } from '../../field-info';
import { SelectModel } from '../../field-info';

@Component({
  selector: 'bp-table-cell',
  templateUrl: './table-base-cell.component.html',
  styleUrls: ['./table-base-cell.component.scss']
})
export class TableCellComponent {

  @Input()
  field: FieldInfo;

  @Input()
  value: any;

  getValueFromOptions(): string {
    const option = (this.field as SelectFieldInfo).options.find(e => e.value === this.value);
    if (option) {
      return option.label;
    }
    return null;
  }

  getMultipleSelectValue(): string {
    return (this.field as MultipleFieldInfo).options.reduce((acc: string, current: SelectModel, index: number) => {
      const found = this.value.find(e => e === current.value);
      if (found) {
        if (index === 0) {
          return `${current.label}`;
        } else {
          return `${acc}, ${current.label}`;
        }
      }
      return acc;
    }, '');
  }

  getDigitInfo(field: FieldInfo): string {
    return `1.${field.decimals}-${field.decimals}`;
  }
}
