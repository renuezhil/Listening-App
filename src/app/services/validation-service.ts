import { AbstractControl, ValidatorFn } from "@angular/forms";
import { Validate } from "../utilities/data-validator";


export class ValidationService {
  static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    let config = {
      'required': 'Required',
      'invalidCreditCard': 'Is invalid credit card number',
      'invalidEmailAddress': 'Invalid email address',
      'invalidLoginPassword': 'Invalid password',
      'invalidPassword': 'Enter a password of at least six-character length with combinations of at least one uppercase letter/one lowercase letter/one number/one special character',
      'invalid': 'Please enter the numbers',
      'compare': `Need to be same as ${validatorValue}`,
      'minlength': `Minimum of ${validatorValue.requiredLength} characters are allowed`,
      'maxlength': `Maximum of ${validatorValue.requiredLength} characters are allowed`,
      'invalidUrl': 'Invalid Url',
      'invalidColorCode': 'Invalid Color Code',
      'invalidPhoneNumber': 'Invalid format',
      'invalidZipCode': 'Invalid format',
      'invalidDecimalValue': 'Invalid format',
      'invalidWebsite': 'Invalid website',
      'invalidIntegerValue': 'Invalid format',
      'invalidSSNNumber': 'Invalid format'
    };

    return config[validatorName];
  }

  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (Validate.isNotNull(control.value) && control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value)) {
        return null;
      }
      return { 'invalidEmailAddress': true };
    }
  }


  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.{6,100})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).*$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }

  static loginPasswordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.{6,100})(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W]).*$/)) {
      return null;
    } else {
      return { 'invalidLoginPassword': true };
    }
  }

  static compareValidator(controlToCompare: string, controlToCompareLabel: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      const name = control.value;
      let compareValue: any;
      compareValue = control.root.value[controlToCompare];
      return compareValue === name ? null : { 'compare': controlToCompareLabel };
    };
  }

  static numbericValidator(control) {
    if (control.value.match(/^[0-9]+$/)) {
      return null;
    } else {
      return { 'invalid': true };
    }
  }


  static urlValidator(control) {
    if (Validate.isNotNull(control.value) && control.value.match(/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value)) {
        return null;
      } else
        return { 'invalidUrl': true };
    }
  }


  static colorCodeValidator(control) {
    if (Validate.isNotNull(control.value) && control.value.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value))
        return null;
      else
        return { 'invalidColorCode': true };
    }
  }
  /*
    static phoneNumberValidator(control) {
      if (Validate.isNotNull(control.value) && control.value.match(/^\((\d{3})\)[ ]?(\d{3})[-]?(\d{4})?$/)) {
        return null;
      } else {
        if(Validate.isEmptyString(control.value))
          return null;
        else
          return {'invalidPhoneNumber': true};
      }
    }
  */
  static zipCodeValidator(control) {
    if (Validate.isNotNull(control.value) && control.value.match(/^\b\d{5}\b$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value))
        return null;
      else
        return { 'invalidZipCode': true };
    }
  }

  static decimalValidator(control) {
    if (Validate.isNotNull(control.value) && (control.value.toString()).match(/^\d{0,3}(\.\d{1,2})?$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value))
        return null;
      else
        return { 'invalidDecimalValue': true };
    }
  }

  static websiteValidator(control) {
    if (Validate.isNotNull(control.value) && control.value.match(/^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value)) {
        return null;
      } else
        return { 'invalidWebsite': true };
    }
  }

  static phoneNumberValidator(control) {
    if (Validate.isNotNull(control.value) && control.value.match(/^(\([0-9]{3}\)\s*|[0-9]{3}\-)[0-9]{3}-[0-9]{4}$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value))
        return null;
      else
        return { 'invalidPhoneNumber': true };
    }
  }

  static integerValidator(control) {
    if (Validate.isNotNull(control.value) && (control.value.toString()).match(/^\d{0,3}$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value))
        return null;
      else
        return { 'invalidIntegerValue': true };
    }
  }

  static ssnValidator(control) {
    if (Validate.isNotNull(control.value) && control.value.match(/^[0-9]{3}-[0-9]{2}-[0-9]{4}$/)) {
      return null;
    } else {
      if (Validate.isEmptyString(control.value))
        return null;
      else
        return { 'invalidSSNNumber': true };
    }
  }

}
