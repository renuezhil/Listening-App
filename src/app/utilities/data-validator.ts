export class Validate {

    static isNull(value: any): boolean {
      return (value === null || value === undefined);
    }

    static isNotNull(value: any): boolean {
      return !Validate.isNull(value);
    }

    static isEmptyString(value: string): boolean {
      return Validate.isNull(value) || value === '';
    }

    static isEmptyObject(options: {}) {
      return Validate.isNull(options) || Object.keys(options).length === 0 && options.constructor === Object
    }

    static containsKey(options: {}, key: string) {
      return Validate.isEmptyObject(options) === false && Validate.isNotNull(options[key]);
    }

    static isNumber(value): boolean {
      if (Validate.isNull(value)) return false;
      value = value.toString().replace(/,/g, '');
      return !isFinite(value) ? false : true;
    }

    static isPositiveInt(value): boolean {
      return (Validate.isNotNull(value) && value > 0) ? true : false;
    }

    static isArray(value: any) {
      return Array.isArray(value);
    }

}
