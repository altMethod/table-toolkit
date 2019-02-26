import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'na' })
export class NotAvailablePipe implements PipeTransform {
  transform(value: any, replacement: string): any {
    return ((!value && (value !== 0)) || value === null || value === 'NaN') ? replacement || 'n/a' : value;
  }
}
