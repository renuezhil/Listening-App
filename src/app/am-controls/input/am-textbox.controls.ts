import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef, forwardRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Validate } from "../../utilities/data-validator";
import { AmFieldComponent } from "./am-input.controls";
import 'jquery-mask-plugin'

// declare var jQuery: any;
import * as jQuery from 'jquery';

const AM_TEXTBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmTextBoxComponent),
  multi: true
};
const AM_TEXTBOX_INLINE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmTextBoxInlineComponent),
  multi: true
};
const AM_TEXTBOX_HORIZONTAL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmTextBoxHorizontalComponent),
  multi: true
};
const AM_DC_TEXTBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmDcTextBoxComponent),
  multi: true
};

@Component({
  selector: 'am-textbox',
  providers: [AM_TEXTBOX_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label && showLabel" [attr.for]="name" class="control-label">{{label}}<span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
      <input #textbox [attr.type]="type" [attr.name]="name" [attr.id]="id" [attr.placeholder]="placeholder" [formControlName]="name"
      class="form-control" (blur)="onTouched()">
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
    </div>`
})

//[(ngModel)]="value" -- removed input field using 
export class AmTextBoxComponent extends AmFieldComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() form: FormGroup;
  @Input() type: string = "text";
  @Input() mask: string;
  @Input() maskReverse: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() showLabel: boolean = true;

  @Input() id: string;


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
    if (Validate.isNotNull(this.mask)) this.$element.mask(this.mask, { reverse: this.maskReverse });
    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }
  }

  ngAfterViewInit() {
    if (this.autoFocus)
      jQuery(this.textBoxElement.nativeElement).focus();
  }
}

@Component({
  selector: 'am-textbox-inline',
  providers: [AM_TEXTBOX_INLINE_VALUE_ACCESSOR],
  template: `<span [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label d-inline">{{label}}</label>
      <input #textbox [attr.type]="type" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
      class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
      <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages>
    </span>`
})
export class AmTextBoxInlineComponent extends AmTextBoxComponent {

}

@Component({
  selector: 'am-textbox-horizontal',
  providers: [AM_TEXTBOX_HORIZONTAL_VALUE_ACCESSOR],
  template: `<div class="form-group row" [class.has-danger]="!isValid" [formGroup]="form">
      <label [attr.for]="name" class="col-form-label text-right" [ngClass]="labelCssSize">{{label}}</label>
      <div [ngClass]="inputCssSize">
        <input #textbox [attr.type]="type" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value" class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
        <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
        <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages>
      </div>
    </div>`
})
export class AmTextBoxHorizontalComponent extends AmTextBoxComponent {
  @Input() labelCssSize: string;
  @Input() inputCssSize: string;
}


@Component({
  selector: 'am-dc-textbox',
  providers: [AM_DC_TEXTBOX_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label && showLabel" [attr.for]="name" class="control-label">{{label}}<span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
      <input #textbox [attr.type]="type" [attr.name]="name" [attr.id]="id" [attr.placeholder]="placeholder" [formControlName]="name"
      class="form-control" (blur)="onTouched()" (click)="onSearchChange($event.target.value)" (focusout)="focusOutFunction()">
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
    </div>`
})

//[(ngModel)]="value" -- removed input field using 
export class AmDcTextBoxComponent extends AmFieldComponent implements OnInit, OnChanges, AfterViewInit {


  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() form: FormGroup;
  @Input() type: string = "text";
  @Input() mask: string;
  @Input() maskReverse: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;
  @Input() autoFocus: boolean = false;
  @Input() showLabel: boolean = true;

  @Input() formValue: string;

  @Input() id: string;


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
    if (Validate.isNotNull(this.mask)) this.$element.mask(this.mask, { reverse: this.maskReverse });
    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }
  }

  ngAfterViewInit() {
    if (this.autoFocus)
      jQuery(this.textBoxElement.nativeElement).focus();
  }

  onSearchChange(searchValue: string) {
    // console.log(searchValue);
    // console.log(this.formValue);
    // this.form.controls[this.name].setValue("TEST");    
  }

  focusOutFunction(searchValue){
    // this.form.controls[this.name].setValue("TESTGB");   
  }
}
