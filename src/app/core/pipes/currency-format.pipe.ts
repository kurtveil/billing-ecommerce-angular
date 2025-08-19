// currency-format.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
  name: 'currencyFormat'
})
export class CurrencyFormatPipe implements PipeTransform {

  constructor(private currencyPipe: CurrencyPipe) {}

  transform(value: number): string | null {
    return this.currencyPipe.transform(value, 'USD', 'symbol', '1.2-2'); // Ajusta según tu moneda y formato preferido
  }
}
