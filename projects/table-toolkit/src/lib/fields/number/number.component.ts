import { Component, forwardRef } from '@angular/core';
import { FieldBase } from '../base-field';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'bp-table-base-number-field',
  templateUrl: './number.component.html',
  styleUrls: ['./number.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberComponent),
      multi: true
    }
  ]
})
export class NumberComponent extends FieldBase {
  constructor() { super(); }
}
