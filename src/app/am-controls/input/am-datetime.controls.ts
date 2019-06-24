import { Component, Input, ViewChild, OnInit, OnChanges, ElementRef, forwardRef, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, NG_VALUE_ACCESSOR } from "@angular/forms";
import { Observable } from "rxjs";
import { Validate } from "../../utilities/data-validator";
import { DateTimeConverter, UnixDateRange } from "../../utilities/datetime-converter";
import { AmFieldComponent } from "./am-input.controls";
import * as moment from 'moment';
//import 'tempusdominus-bootstrap-4';

declare var jQuery: any;

const AM_DATETIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmDateTimePickerComponent),
  multi: true
};

const AM_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmTimePickerComponent),
  multi: true
};

const AM_COLORPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmColorPickerComponent),
  multi: true
};

const AM_DATETIMEPICKER_INLINE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmDateTimePickerInlineComponent),
  multi: true
};
const AM_DATETIMEPICKER_HORIZONTAL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmDateTimePickerHorizontalComponent),
  multi: true
};
const AM_DATERANGEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmDateRangePickerComponent),
  multi: true
};

@Component({
  selector: 'am-datetimepicker',
  providers: [AM_DATETIMEPICKER_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="control-label">{{label}} <span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
      <div class="input-group date" #dateTimePicker [attr.id]="'dateTimePicker' + name"  data-target-input="nearest">
        <input #dateTimePickerInput type="text" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control datetimepicker-input" (blur)="onTouched()" [attr.data-target]="'#dateTimePicker' + name">
        <span class="input-group-addon" [attr.data-target]="'#dateTimePicker' + name" data-toggle="datetimepicker">
          <span class="fa fa-calendar"></span>
        </span>
      </div>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>

    </div>`
})
export class AmDateTimePickerComponent extends AmFieldComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() showTimePicker: boolean = false;
  @Input() form: FormGroup;
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;
  @Input() autoFocus: boolean = false;

  @ViewChild('dateTimePicker') public elementRef: ElementRef;
  private $element: any;

  @ViewChild('dateTimePickerInput') public elementInputRef: ElementRef;
  private $elementInput: any;

  ngOnChanges() {
    if (this.$elementInput) {
      if (this.isDisabled)
        this.$elementInput.attr("disabled", "disabled");
      else
        this.$elementInput.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$element = jQuery(this.elementRef.nativeElement);
    this.$elementInput = jQuery(this.elementInputRef.nativeElement);

    var self = this.$element;
    if (this.isDisabled) {
      this.$elementInput.attr("disabled", "disabled");
    }

    var dateTimeFormat = this.showTimePicker ? DateTimeConverter.DATETIME_FORMAT : DateTimeConverter.DATE_FORMAT;
    this.$element.datetimepicker({
      useCurrent: false,
      format: dateTimeFormat
    });

    this.$element.on("change.datetimepicker", (e) => {
      if (e.date === undefined) {
        if (!moment(new Date(e.target.value), dateTimeFormat).isValid()) {
          this.form.controls[this.name].setValue('');
          return;
        } else
          e.date = moment(new Date(e.target.value));
      }

      if (e.date === false) {
        this.form.controls[this.name].setValue('');
        return;
      }
      this.form.controls[this.name].setValue(e.date.format(dateTimeFormat));
    });

    //  this.form.controls[this.name].valueChanges.subscribe((value: any) => {
    //     if(value == null){
    //       this.$element.data('datetimepicker').defaultDate(new Date()).clear();
    //     }
    // });
  }

  ngAfterViewInit() {
    if (this.autoFocus)
      jQuery(this.elementInputRef.nativeElement).focus();
  }

  protected updateView(value: any) {
    if (Validate.isEmptyString(value)) return;

    Observable.timer(1)
      .subscribe(() => {
        if (isNaN(value))
          this.$element.data('datetimepicker').date(value);
      });
  }
}


@Component({
  selector: 'am-timepicker',
  providers: [AM_TIMEPICKER_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="control-label">{{label}} <span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
      <div class="input-group date" #dateTimePicker [attr.id]="'dateTimePicker' + name"  data-target-input="nearest">
        <input #dateTimePickerInput type="text" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control datetimepicker-input" (blur)="onTouched()" [attr.data-target]="'#dateTimePicker' + name">
        <span class="input-group-addon" [attr.data-target]="'#dateTimePicker' + name" data-toggle="datetimepicker">
          <span class="fa fa-calendar"></span>
        </span>
      </div>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>

    </div>`
})
export class AmTimePickerComponent extends AmFieldComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() showTimePicker: boolean = true;
  @Input() form: FormGroup;
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;
  @Input() autoFocus: boolean = false;

  @ViewChild('dateTimePicker') public elementRef: ElementRef;
  private $element: any;

  @ViewChild('dateTimePickerInput') public elementInputRef: ElementRef;
  private $elementInput: any;

  ngOnChanges() {
    if (this.$elementInput) {
      if (this.isDisabled)
        this.$elementInput.attr("disabled", "disabled");
      else
        this.$elementInput.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$element = jQuery(this.elementRef.nativeElement);
    this.$elementInput = jQuery(this.elementInputRef.nativeElement);

    var self = this.$element;
    if (this.isDisabled) {
      this.$elementInput.attr("disabled", "disabled");
    }

    var dateTimeFormat = this.showTimePicker ? DateTimeConverter.DATETIME_FORMAT : DateTimeConverter.DATE_FORMAT;
    this.$element.datetimepicker({
      useCurrent: false,
      format: 'LT'
    });

    // this.$element.on("change.datetimepicker", (e) => {
    //   if (e.date === undefined){
    //     if(!moment(new Date(e.target.value), dateTimeFormat).isValid()){
    //       this.form.controls[this.name].setValue('');
    //       return;
    //     }else
    //       e.date = moment(new Date(e.target.value));
    //    }

    //    if(e.date === false){
    //      this.form.controls[this.name].setValue('');
    //      return;
    //    }
    //   this.form.controls[this.name].setValue(e.date.format(dateTimeFormat));
    // });

    //  this.form.controls[this.name].valueChanges.subscribe((value: any) => {
    //     if(value == null){
    //       this.$element.data('datetimepicker').defaultDate(new Date()).clear();
    //     }
    // });
    this.$elementInput.on("blur", (e) => {
            // if (e.target.value.length == 7)
        this.form.controls[this.name].setValue(e.target.value);
      // else
      //   this.form.controls[this.name].setValue('');
    });
  }

  ngAfterViewInit() {
    if (this.autoFocus)
      jQuery(this.elementInputRef.nativeElement).focus();
  }

  protected updateView(value: any) {
    if (Validate.isEmptyString(value)) return;

    Observable.timer(1)
      .subscribe(() => {
        if (isNaN(value))
          this.$element.data('datetimepicker').date(value);
      });
  }
}



@Component({
  selector: 'am-colorpicker',
  providers: [AM_COLORPICKER_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="control-label">{{label}} <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages></label>
        <input #colorPickerInput  type="text" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">

    </div>`
})
export class AmColorPickerComponent extends AmFieldComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;

  @Input() form: FormGroup;
  @Input() isDisabled: boolean = false;

  @ViewChild('colorPickerInput') public elementInputRef: ElementRef;
  private $elementInput: any;

  ngOnChanges() {
    if (this.$elementInput) {
      if (this.isDisabled)
        this.$elementInput.attr("disabled", "disabled");
      else
        this.$elementInput.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$elementInput = jQuery(this.elementInputRef.nativeElement);

    if (this.isDisabled) {
      this.$elementInput.attr("disabled", "disabled");
    }

    this.$elementInput.minicolors({
      control: "hue",
      defaultValue: "",
      inline: "true" === jQuery(this).attr("data-inline"),
      letterCase: "lowercase",
      position: "top right",
      theme: "bootstrap",
      changeDelay: 200
    });

    this.$elementInput.on("change", (e) => {
      this.form.controls[this.name].setValue(e.target.value);
    });

    this.form.controls[this.name].valueChanges.subscribe((value: any) => {
      this.$elementInput.minicolors('value', value);
    });

    this.$elementInput.on("blur", (e) => {
      if (e.target.value.length == 7)
        this.form.controls[this.name].setValue(e.target.value);
      else
        this.form.controls[this.name].setValue('');
    });

  }

}

@Component({
  selector: 'am-datetimepicker-inline',
  providers: [AM_DATETIMEPICKER_INLINE_VALUE_ACCESSOR],
  template: `<span [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label d-inline">{{label}}</label>
      <div class="input-group date" #dateTimePicker>
        <input #dateTimePickerInput type="text" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
        <span class="input-group-addon">
          <span class="fa fa-calendar"></span>
        </span>
      </div>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
      <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages>
    </span>`
})
export class AmDateTimePickerInlineComponent extends AmDateTimePickerComponent {

}

@Component({
  selector: 'am-datetimepicker-horizontal',
  providers: [AM_DATETIMEPICKER_HORIZONTAL_VALUE_ACCESSOR],
  template: `<div class="form-group row" [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label" [ngClass]="labelCssSize">{{label}}</label>
      <div [ngClass]="inputCssSize">
        <div class="input-group date" #dateTimePicker>
          <input #dateTimePickerInput type="text" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
          class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
          <span class="input-group-addon">
            <span class="fa fa-calendar"></span>
          </span>
        </div>
        <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
        <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages>
      </div>
    </div>`
})
export class AmDateTimePickerHorizontalComponent extends AmDateTimePickerComponent {
  @Input() labelCssSize: string;
  @Input() inputCssSize: string;
}

@Component({
  selector: 'am-daterangepicker',
  providers: [AM_DATERANGEPICKER_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label">{{label}}</label>
      <div class="input-group date" #dateRangePicker>
        <input #dateRangePickerInput type="text" [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
        <span class="input-group-addon">
          <span class="fa fa-calendar"></span>
        </span>
      </div>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
      <am-error-messages *ngIf="!isValid"  [control]="form.controls[name]"></am-error-messages>
    </div>`
})
export class AmDateRangePickerComponent extends AmFieldComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() showTimePicker: boolean = false;
  @Input() form: FormGroup;
  @Input() isDisabled: boolean = false;

  @ViewChild('dateRangePicker') public elementRef: ElementRef;
  private $element: any;

  @ViewChild('dateRangePickerInput') public elementInputRef: ElementRef;
  private $elementInput: any;

  ngOnChanges() {
    if (this.$elementInput) {
      if (this.isDisabled)
        this.$elementInput.attr("disabled", "disabled");
      else
        this.$elementInput.removeAttr("disabled");
    }
  }

  ngOnInit() {
    this.$element = jQuery(this.elementRef.nativeElement);
    this.$elementInput = jQuery(this.elementInputRef.nativeElement);

    if (this.isDisabled) {
      this.$elementInput.attr("disabled", "disabled");
    }

    var dateTimeFormat = this.showTimePicker ? DateTimeConverter.DATETIME_FORMAT : DateTimeConverter.DATE_FORMAT;

    this.$elementInput.daterangepicker({
      locale: { format: dateTimeFormat },
      timePicker: this.showTimePicker
    }, (start, end) => {
      let range: UnixDateRange = DateTimeConverter.createUnixDateRangeBetween(start, end);
      this.form.controls[this.name].setValue(range);
    });

    // this.$element.on("dp.change", (e) => {
    //   if (Validate.isNull(e) || e.date === false) return;
    //   this.form.controls[this.name].setValue(e.date.format(dateTimeFormat))
    // });
  }

  protected updateView(value: any) {
    if (Validate.isEmptyString(value)) return;

    Observable.timer(1)
      .subscribe(() => {
        let range: UnixDateRange = <UnixDateRange>value;
        this.$elementInput.data('daterangepicker').setStartDate(range.startAsMoment);
        this.$elementInput.data('daterangepicker').setEndDate(range.endAsMoment);
      });
  }
}
