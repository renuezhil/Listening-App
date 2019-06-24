import {
  Component,
  Input,
  ElementRef,
  ContentChildren,
  QueryList,
  OnInit,
  ViewChild,
  forwardRef,
  OnChanges, AfterViewInit
} from "@angular/core";
import {FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {DecimalPipe} from "@angular/common";
import {Observable} from "rxjs";
import {Validate} from "../../utilities/data-validator";
import {Converter} from "../../utilities/data-converter";
import {DateTimeConverter} from "../../utilities/datetime-converter";
import {ValidationService} from "../../services/validation-service";
import {IAmSelectDataSource} from "./am-input.datasource";

declare var jQuery: any;

const noop = () => {
};
const AM_TEXTAREA_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmTextAreaComponent),
  multi: true
};
const AM_STATIC_TEXTBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmStaticTextBoxComponent),
  multi: true
};
const AM_CURRENCY_TEXTBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmCurrencyTextBoxComponent),
  multi: true
};

const AM_RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmRadioComponent),
  multi: true
};
const AM_CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmCheckBoxComponent),
  multi: true
};

const AM_CUSTOM_TEXTBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmCustomTextBoxComponent),
  multi: true
};

@Component({
  selector: 'am-error-messages',
  template: `<small *ngIf="errorMessage !== null">({{errorMessage}})</small>`
})
export class AmErrorMessagesComponent {

  @Input() control: FormControl;

  constructor() {
  }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }

    return null;
  }
}

@Component({
  selector: 'am-option',
  template: ``
})
export class AmOptionComponent {
  @Input() value: number;
  @Input() text: string;
}

export class AmFieldComponent implements ControlValueAccessor {

  name: string;
  form: FormGroup;

  get isValid(): boolean {
    return this.form.controls[this.name].untouched || this.form.controls[this.name].valid;

  }

  get isSuccess() : boolean {
    return this.form.controls[this.name].touched && this.form.controls[this.name].valid;
  }

  //The internal data model
  protected _value: any = '';

  //Placeholders for the callbacks
  protected _onTouchedCallback: () => void = noop;

  protected _onChangeCallback: (_: any) => void;

  //get accessor
  get value(): any {
    return this._value;
  };

  //set accessor including call the onchange callback
  set value(v: any) {
    if (v !== this._value) {
      this._value = v;
      if (this._onChangeCallback) this._onChangeCallback(v);
    }
  }

  //Set touched on blur
  onTouched() {
    this._onTouchedCallback();
  }

  //From ControlValueAccessor interface
  writeValue(value: any) {
    if (value !== undefined) this._value = value;
    this.updateView(this._value);
  }

  //From ControlValueAccessor interface
  registerOnChange(fn: any) {
    this._onChangeCallback = fn;
  }

  //From ControlValueAccessor interface
  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  protected updateView(value: any) {
  }

}

@Component({
  selector: 'am-textarea',
  providers: [AM_TEXTAREA_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label [attr.for]="name" class="control-label">{{label}}  <span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
      <textarea #textarea [attr.rows]="rows" [attr.columns]="columns" [attr.name]="name" [attr.id]="name" class="form-control" [formControlName]="name"  [(ngModel)]="value" (blur)="onTouched()"></textarea>
    </div>`
})
export class AmTextAreaComponent extends AmFieldComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() rows: number = 5;
  @Input() columns: number = 30;
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;

  @ViewChild('textarea') public textAreaElement: ElementRef;
  private $element: any;

  ngOnChanges() {
    if (this.$element) {
      if (this.isDisabled)
        this.$element.attr("disabled", "disabled");
      else
        this.$element.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$element = jQuery(this.textAreaElement.nativeElement);
    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }
  }

}

@Component({
  selector: 'am-static-textbox',
  providers: [AM_STATIC_TEXTBOX_VALUE_ACCESSOR],
  template: `<div class="form-group" [formGroup]="form">
      <label [attr.for]="name" class="form-control-label">{{label}}</label>
      <div class="input-group">
        <span *ngIf="getFormatSymbol()" class="input-group-addon readonly">{{ getFormatSymbol() }}</span>
        <input class="form-control" [attr.name]="name" [attr.id]="name" type="text" readonly [formControlName]="name" [(ngModel)]="value" (blur)="onTouched()">
      </div>
    </div>`
})
export class AmStaticTextBoxComponent extends AmFieldComponent {

  @Input() label: string;
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() format: string = 'currency';

  getFormatSymbol() {
    switch (this.format) {
      case 'ratio':
        return '%';
      case 'currency':
        return '$';
      default:
        return null;
    }
  }
}


@Component({
  selector: 'am-custom-textbox',
  providers: [AM_CUSTOM_TEXTBOX_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="control-label">{{label}}<span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
      <input #textbox [attr.type]="type" [attr.name]="name" max="100" min="0" [attr.id]="name" [formControlName]="name" [attr.placeholder]="placeholder" [(ngModel)]="value"
      class="form-control" (blur)="onTouched()">
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
    </div>`
})
export class AmCustomTextBoxComponent extends AmFieldComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() form: FormGroup;
  @Input() type: string = "number";
  @Input() inputFormat: string = "Percentage";
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;
  @Input() autoFocus: boolean  = false;

  @ViewChild('textbox') public textBoxElement: ElementRef;
  private $element: any = null;

  ngOnChanges() {
    if (this.$element) {
      if (this.isDisabled)
        this.$element.attr("disabled", "disabled");
      else
        this.$element.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$element = jQuery(this.textBoxElement.nativeElement);
    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }
  }

  ngAfterViewInit() {
    if(this.autoFocus)
      jQuery(this.textBoxElement.nativeElement).focus();
  }


  onTouched() {
    var value = this.value;
    if(this.inputFormat == 'Qty'){
      var regExp = /^[0-9]{1,7}$/;
      if(!Validate.isEmptyString(value) && regExp.test(value))
        this.value = value;
      else
        this.value = 0;
    }

    if(this.inputFormat == 'Percentage'){
      var regExp = /^\d{1,3}(\.\d{1,2})?$/;
      if(!Validate.isEmptyString(value) && regExp.test(value)){
        if(value <= 100 && value >= 0)
          this.value = value;
        else
          this.value = 0;
      }        
      else
        this.value = 0;
    }

    if(this.inputFormat == 'Decimal'){
      var regExp = /^\d{1,7}(\.\d{1,2})?$/;
      if(!Validate.isEmptyString(value) && regExp.test(value))
        this.value = value;
      else
        this.value = 0;
    }

    this._onTouchedCallback();
  }
}

@Component({
  selector: 'am-currency-textbox',
  providers: [AM_CURRENCY_TEXTBOX_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-danger]="!isValid" [formGroup]="form">
      <label [attr.for]="name" class="form-control-label">{{label}} <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages></label>
      <div class="input-group">
        <span class="input-group-addon">$</span>
        <input #textbox type="text" [attr.name]="name" [attr.id]="name" class="form-control" [formControlName]="name" [(ngModel)]="value"
                   (blur)="onTouched()">
      </div>
    </div>`
})
export class AmCurrencyTextBoxComponent extends AmFieldComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() isDisabled: boolean = false;

  @ViewChild('textbox') public textBoxElement: ElementRef;
  private $element: any;

  private currencyPipe: DecimalPipe = new DecimalPipe("en-US");

  ngOnChanges() {
    if (this.$element) {
      if (this.isDisabled)
        this.$element.attr("disabled", "disabled");
      else
        this.$element.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$element = jQuery(this.textBoxElement.nativeElement);
    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }
  }

  onTouched() {
    this.value = this.currencyPipe.transform(Converter.toFloat(this.value), '1.2-2');
    this._onTouchedCallback();
  }

}


@Component({
  selector: 'am-radio',
  providers: [AM_RADIO_VALUE_ACCESSOR],
  template: `<label *ngIf="label" [attr.for]="name" class="form-control-label">{{label}} <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages></label>
    <div class="form-check" [class.form-check-inline]="isInline" [class.has-danger]="!isValid" [class.disabled]="isDisabled" [formGroup]="form"
      *ngFor="let option of options">
        <label class="form-check-label">
            <input class="form-check-input" type="radio" [attr.id]="name" [attr.name]="name" [value]="option.value" [formControlName]="name" [(ngModel)]="value"
                  (blur)="onTouched()" [attr.disabled]="isDisabled ? true : null"> {{option.text}}
        </label>
    </div>`
})
export class AmRadioComponent extends AmFieldComponent {
  @Input() label: string;
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() isInline: boolean = false;
  @Input() isDisabled: boolean = false;
  @ContentChildren(AmOptionComponent) options: QueryList<AmOptionComponent>;

}

@Component({
  selector: 'am-checkbox',
  providers: [AM_CHECKBOX_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-danger]="!isValid" [class.disabled]="isDisabled"  [formGroup]="form">
        <label class="form-check-label">
            <input class="form-check-input" type="checkbox" [attr.id]="name" [attr.name]="name" [formControlName]="name" [(ngModel)]="value"
                  (blur)="onTouched()" [attr.disabled]="isDisabled ? true : null"> {{label}}
        </label>
</div>`
})
export class AmCheckBoxComponent extends AmFieldComponent {
  @Input() label: string
  @Input() name: string;
  @Input() isDisabled: boolean = false;
  @Input() form: FormGroup;

}
