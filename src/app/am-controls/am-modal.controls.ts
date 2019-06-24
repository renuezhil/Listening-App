import {Component, ViewChild, Output, EventEmitter, ElementRef, AfterViewInit, Input} from "@angular/core";

declare var jQuery: any;

@Component({
  selector: 'am-modal',
  exportAs: 'amModal',
  template: `<div #modal class="modal" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" aria-label="Close" (click)="hideModal()">
              <span aria-hidden="true">&times;</span>
            </button>
            <h4 class="modal-title">{{ heading }}</h4>
          </div>
          <div class="modal-body">
            <ng-content></ng-content>
          </div>
          <div class="modal-footer" *ngIf="!hideFooter">
            <button *ngIf = "!hideCloseButton" type="button" class="btn btn-default" (click)="dismiss()">Close</button>
            <button *ngIf = "!hideSaveButton" type="button" class="btn btn-primary" (click)="save()">Save changes</button>
          </div>
        </div>
      </div>
    </div>`,
})
export class AmModalComponent implements AfterViewInit {

  @Input() heading: string;
  @Input() hideSave: string = "false";
  @Input() hideCloseButton: boolean = false;
  @Input() hideSaveButton: boolean = false;
  @Input() hideFooter: boolean = false;

  @ViewChild('modal') public modalElement: ElementRef;
  private modalDiv: any;

  @Output() onSave = new EventEmitter<any>();
  @Output() onDismiss = new EventEmitter<any>();

  ngAfterViewInit() {
    this.modalDiv = jQuery(this.modalElement.nativeElement);
  }

  public showModal():void {
    this.modalDiv.modal('show');
  }

  public hideModal():void {
    this.modalDiv.modal('hide');
  }

  save() {
    this.onSave.emit(null);
    this.hideModal();
  }

  dismiss() {
    this.onDismiss.emit(null);
    this.hideModal();
  }
}
