import {NgModule} from '@angular/core';
import {CommonModule} from "@angular/common";
import {ReactiveFormsModule, FormsModule} from '@angular/forms';

import {
  AmErrorMessagesComponent, AmCurrencyTextBoxComponent,
  AmStaticTextBoxComponent, AmOptionComponent, AmTextAreaComponent, AmRadioComponent,
  AmCheckBoxComponent, AmCustomTextBoxComponent
} from "./input/am-input.controls";
import {AmTextBoxComponent, AmTextBoxInlineComponent, AmTextBoxHorizontalComponent, AmDcTextBoxComponent} from "./input/am-textbox.controls";
import {AmSelectComponent, AmSelectInlineComponent, AmSelectHorizontalComponent, AmSelect2Component, AmSelect2InlineComponent, AmSelect2HorizontalComponent} from "./input/am-select.controls" ;
import {AmDateTimePickerComponent, AmDateTimePickerInlineComponent, AmDateTimePickerHorizontalComponent, AmTimePickerComponent, AmDateRangePickerComponent, AmColorPickerComponent} from "./input/am-datetime.controls";
import {AmFiltersComponent, AmSearchFilterComponent, AmDropDownFilterComponent, AmDropDownItemComponent} from "./am-filter.controls";
import {
  AmTableComponent, AmTableTextColumnComponent, AmTableStyledTextColumnComponent, AmTableButtonColumnComponent,
  AmTableLinkColumnComponent, AmTableProgressColumnComponent, AmTableGroupColumnComponent, AmTableSortCommunicationService
} from "./am-table.controls";
import {RouterModule} from "@angular/router";
import {AmDropzoneComponent} from "./input/am-dropzone.controls";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    AmTextBoxComponent, AmTextBoxInlineComponent, AmTextBoxHorizontalComponent,
    AmSelectComponent, AmSelectInlineComponent, AmSelectHorizontalComponent, AmSelect2Component, AmSelect2InlineComponent, AmSelect2HorizontalComponent,
    AmColorPickerComponent, AmDateTimePickerComponent, AmDateTimePickerInlineComponent, AmDateTimePickerHorizontalComponent, AmTimePickerComponent, AmDateRangePickerComponent,
    AmTextAreaComponent, AmStaticTextBoxComponent, AmCurrencyTextBoxComponent , AmOptionComponent, AmDropzoneComponent,
    AmRadioComponent, AmCheckBoxComponent, AmFiltersComponent, AmSearchFilterComponent, AmDropDownFilterComponent, AmDropDownItemComponent,
    AmTableComponent, AmTableTextColumnComponent, AmTableStyledTextColumnComponent, AmTableButtonColumnComponent, AmTableLinkColumnComponent, AmTableProgressColumnComponent,
    AmTableGroupColumnComponent, AmCustomTextBoxComponent, AmDcTextBoxComponent
  ],
  declarations: [
    AmTextBoxComponent, AmTextBoxInlineComponent, AmTextBoxHorizontalComponent,
    AmSelectComponent, AmSelectInlineComponent, AmSelectHorizontalComponent, AmSelect2Component, AmSelect2InlineComponent, AmSelect2HorizontalComponent,
    AmColorPickerComponent, AmDateTimePickerComponent, AmDateTimePickerInlineComponent, AmDateTimePickerHorizontalComponent, AmTimePickerComponent, AmDateRangePickerComponent,
    AmErrorMessagesComponent, AmTextAreaComponent, AmStaticTextBoxComponent, AmCurrencyTextBoxComponent, AmOptionComponent, AmDropzoneComponent,
    AmRadioComponent, AmCheckBoxComponent, AmFiltersComponent, AmSearchFilterComponent, AmDropDownFilterComponent, AmDropDownItemComponent,
    AmTableComponent, AmTableTextColumnComponent, AmTableStyledTextColumnComponent, AmTableButtonColumnComponent, AmTableLinkColumnComponent, AmTableProgressColumnComponent,
    AmTableGroupColumnComponent, AmCustomTextBoxComponent, AmDcTextBoxComponent
  ],
  providers: [AmTableSortCommunicationService],
  bootstrap: []
})
export class AmControlsModule {
}
