import {Component, Input, Output, EventEmitter, QueryList, ContentChildren, HostBinding, OnInit} from "@angular/core";

export enum AmDropDownItemType {
  Option,
  Header,
  Divider
}

@Component({
  selector: 'am-dropdown-item',
  template: ''
})
export class AmDropDownItemComponent {

  @Input() type: AmDropDownItemType;
  @Input() value: any;
  @Input() text: string;
}

@Component({
  selector: 'am-dropdown-filter',
  template: `<div class="btn-group am-filter-dropdown dropdown">
    <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
      <span class="am-filter-text-truncate">{{label}}:  {{text}}</span> <span class="caret"></span>
    </button>
    <ul class="dropdown-menu">
      <ng-template ngFor let-item [ngForOf]="items">
          <li *ngIf="item.type === 'Header'" class="dropdown-header">{{ item.text }}</li>
          <li *ngIf="item.type === 'Option'"><a href="javascript:void(0)"  class="dropdown-item" (click)="select(item)">{{ item.text }}</a></li>
          <li *ngIf="item.type === 'Divider'" role="separator" class="divider"></li>
      </ng-template>
    </ul>
  </div>`
})
export class AmDropDownFilterComponent implements OnInit {

  @HostBinding('class') cssClass = "am-filter-control";

  amDropDownItemType = AmDropDownItemType;

  @ContentChildren(AmDropDownItemComponent)
  items: QueryList<AmDropDownItemComponent>;
  @Input() value: any;
  @Input() label: string = "Filter"
  @Input() text: string;
  @Output() onSelected = new EventEmitter<AmDropDownItemComponent>();

  constructor() {
    this.value = 0;
  }
ngOnInit(){
  console.log(this.items)
}
  select(item: AmDropDownItemComponent) {
    this.value = item.value;
    this.text = item.text;
    this.onSelected.emit(item);
  }
}

@Component({
  selector: 'am-search-filter',
  template: `<div class="input-group am-filter-search">
    <input type="text" class="form-control" [attr.placeholder]="placeholder" [(ngModel)] = "value">
    <span class="input-group-append">
      <button class="btn btn-primary" type="button" (click)="search()">Go!</button>
    </span>
  </div>`
})
export class AmSearchFilterComponent {

  @HostBinding('class') cssClass = "am-filter-control";
  @Input() placeholder: string = "Search by ...";
  @Input() value: string;
  @Output() onSearch = new EventEmitter<string>();

  constructor() {
  }

  search() {
    this.onSearch.emit(this.value);
  }

}

@Component({
  selector: 'am-filters',
  template: '<ng-content></ng-content>',
})
export class AmFiltersComponent {
}