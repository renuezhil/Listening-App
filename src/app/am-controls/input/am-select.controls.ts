import {Component, OnInit, OnChanges, Input, ViewChild, ContentChildren, QueryList, ElementRef, forwardRef} from '@angular/core';
import {FormControl, FormGroup, NG_VALUE_ACCESSOR} from "@angular/forms";
import {Observable} from "rxjs";
import {Validate} from "../../utilities/data-validator";
import {AmFieldComponent, AmOptionComponent} from "./am-input.controls";
import {IAmSelectDataSource} from "./am-input.datasource";

declare var jQuery: any;

const AM_SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmSelectComponent),
  multi: true
};
const AM_SELECT_INLINE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmSelectInlineComponent),
  multi: true
};
const AM_SELECT_HORIZONTAL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmSelectHorizontalComponent),
  multi: true
};
const AM_SELECT2_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmSelect2Component),
  multi: true
};
const AM_SELECT2_INLINE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmSelect2InlineComponent),
  multi: true
};
const AM_SELECT2_HORIZONTAL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AmSelect2HorizontalComponent),
  multi: true
};

@Component({
  selector: 'am-select',
  providers: [AM_SELECT_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="control-label">{{label}} <span *ngIf="isRequiredField" class="required">*</span> <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages></label>
      <select #select [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" 
       class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
        <option *ngIf="displayDefaultOption" value="">Select</option>
        <option *ngFor="let option of options" [attr.value]="option.value" [selected]="option.value == value">{{option.text}}</option>
      </select>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
    </div>`
})

//[(ngModel)]="value"
export class AmSelectComponent extends AmFieldComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() form: FormGroup;

  @Input() isMultiSelect: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() displayDefaultOption: boolean = false;
  @Input() isRequiredField: boolean = false;

  @ContentChildren(AmOptionComponent) options: QueryList<AmOptionComponent>;
  @ViewChild('select') public selectElement: ElementRef;

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
    this.$element = jQuery(this.selectElement.nativeElement);
    if (this.isMultiSelect) {
      this.$element.attr("multiple", "multiple");
    }
    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }

  }

}

@Component({
  selector: 'am-select-inline',
  providers: [AM_SELECT_INLINE_VALUE_ACCESSOR],
  template: `<span [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label d-inline">{{label}}</label>
      <select #select [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
       class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
        <option *ngFor="let option of options" [attr.value]="option.value" [selected]="option.value == value">{{option.text}}</option>
      </select>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
      <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages>
    </span>`
})
export class AmSelectInlineComponent extends AmSelectComponent {

}

@Component({
  selector: 'am-select-horizontal',
  providers: [AM_SELECT_HORIZONTAL_VALUE_ACCESSOR],
  template: `<div class="form-group row" [class.has-danger]="!isValid" [formGroup]="form">
      <label [attr.for]="name" class="col-form-label text-right" [ngClass]="labelCssSize">{{label}}</label>
      <div [ngClass]="inputCssSize">
        <select #select [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
          <option *ngFor="let option of options" [attr.value]="option.value" [selected]="option.value == value">{{option.text}}</option>
        </select>
        <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
        <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages>
      </div>
    </div>`
})
export class AmSelectHorizontalComponent extends AmSelectComponent {
  @Input() labelCssSize: string;
  @Input() inputCssSize: string;
}


@Component({
  selector: 'am-select2',
  providers: [AM_SELECT2_VALUE_ACCESSOR],
  template: `<div class="form-group" [class.has-error]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="control-label">{{label}} <span *ngIf="isRequiredField" class="required">*</span>
       <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages></label>
      <select #select [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control" (blur)="onTouched()">
        <option *ngFor="let option of options" [attr.value]="option.value">{{option.text}}</option>
      </select>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
    </div>`
})
export class AmSelect2Component extends AmFieldComponent implements OnInit, OnChanges {
  @Input() label: string;
  @Input() name: string;
  @Input() placeholder: string;
  @Input() helpText: string;
  @Input() form: FormGroup;

  @Input() isMultiSelect: boolean = false;
  @Input() dataSource = <IAmSelectDataSource>null;
  @Input() isDisabled: boolean = false;
  @Input() isRequiredField: boolean = false;

  @ContentChildren(AmOptionComponent) options: QueryList<AmOptionComponent>;
  @ViewChild('select') public selectElement: ElementRef;

  private $element: any;
  private $select: any;

  ngOnChanges() {
    if (this.$element) {
      if (this.isDisabled)
        this.$element.attr("disabled", "disabled");
      else
        this.$element.removeAttr("disabled");
    }
  }

  ngOnInit() {

    this.$element = jQuery(this.selectElement.nativeElement);
    if (this.isMultiSelect) this.$element.attr("multiple", "multiple");

    if (this.isDisabled) {
      this.$element.attr("disabled", "disabled");
    }

    let options: {} = {};
    if (Validate.isNotNull(this.dataSource)) {
      options['ajax'] = this.dataSource.ajaxOptions;
    }

    this.$select = this.$element.select2(options);

    this.$select.on("select2:select", (e) => {
      this.value = this.$select.val();
    });
    this.$select.on("select2:unselect", (e) => {
      this.value = this.$select.val();
    });

    this.form.controls[this.name].valueChanges.subscribe((value: any) => {
        this.$select.val(value).trigger("change");
    });
  }

  protected updateView(value: any) {
    Observable.timer(1)
      .subscribe(() => this.$select.val(value).trigger("change"));
  }

}

@Component({
  selector: 'am-select2-inline',
  providers: [AM_SELECT2_INLINE_VALUE_ACCESSOR],
  template: `<span [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label d-inline">{{label}}</label>
      <select #select [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
        class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
        <option *ngFor="let option of options" [attr.value]="option.value">{{option.text}}</option>
      </select>
      <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
      <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages>
    </span>`
})
export class AmSelect2InlineComponent extends AmSelect2Component {

}

@Component({
  selector: 'am-select2-horizontal',
  providers: [AM_SELECT2_HORIZONTAL_VALUE_ACCESSOR],
  template: `<div class="form-group row" [class.has-danger]="!isValid" [formGroup]="form">
      <label *ngIf="label" [attr.for]="name" class="col-form-label text-right" [ngClass]="labelCssSize">{{label}}</label>
      <div [ngClass]="inputCssSize">
        <select #select [attr.name]="name" [attr.id]="name" [attr.placeholder]="placeholder" [formControlName]="name" [(ngModel)]="value"
          class="form-control" [class.form-control-danger]="!isValid" (blur)="onTouched()">
          <option *ngFor="let option of options" [attr.value]="option.value">{{option.text}}</option>
        </select>
        <small *ngIf="helpText" class="form-text text-muted">{{helpText}}</small>
        <am-error-messages *ngIf="!isValid" [control]="form.controls[name]"></am-error-messages>
      </div>
    </div>`
})
export class AmSelect2HorizontalComponent extends AmSelect2Component {
  @Input() labelCssSize: string;
  @Input() inputCssSize: string;
}
