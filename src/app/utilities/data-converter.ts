import {DecimalPipe} from "@angular/common";
import {Validate} from './data-validator';

export class Converter {

  private static decimalPipe: DecimalPipe = new DecimalPipe("en-US");

  static toInt(value): number {
    if (Validate.isNull(value)) return 0;
    value = value.toString().replace(/,/g, '');
    return !isFinite(value) ? 0 : parseInt(value);
  }

  static toFloat(value): number {
    if (Validate.isNull(value)) return 0;
    value = value.toString().replace(/,/g, '');
    return !isFinite(value) ? 0 : parseFloat(value);
  }

  static toBoolean(value: string): boolean {
    if (Validate.isNull(value)) return false;
    return String(value) === "true";
  }

  static toCurrency(value): string {
    return Converter.decimalPipe.transform(value, '1.2-2');
  }

  static format(value: any, format: string): string {
    value = Converter.toFloat(value);
    switch (format) {
      case 'percentage': return Converter.decimalPipe.transform(value, '1.2-2');
      case 'whole-percentage': return Converter.decimalPipe.transform(value, '1.0-0');
      case 'ratio': return Converter.decimalPipe.transform(value, '1.2-2');
      case 'currency': return Converter.toCurrency(value);
      default: return value;
    }
  }

}
