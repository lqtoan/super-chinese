import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'formatPrice' })
export class FormatPricePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) { return '0'; }
    value = value.toString().replace(/[\,]+/g, '');
    value = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return value.concat(' ₫');
  }
}
