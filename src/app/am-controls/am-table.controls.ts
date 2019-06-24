import {
  Component,
  OnInit,
  AfterViewInit,
  OnDestroy,
  QueryList,
  Input,
  Injectable,
  ContentChildren,
  Output,
  EventEmitter, forwardRef
} from "@angular/core";
import { Subject } from "rxjs/Subject";
import { Subscription } from "rxjs/Subscription";
import { Converter } from "../utilities/data-converter";
import { DateTimeConverter } from "../utilities/datetime-converter";
import { AmTableSortInfo, AmTableSort, AmTablePagination, AmTableColumnType } from "./am-table.models";
import { IAmTableDataSource } from "./am-table.datasource";
import { Validate } from "../utilities/data-validator";



@Injectable()
export class AmTableSortCommunicationService {
  private initEvent = new Subject<AmTableSortInfo>();
  private sortEvent = new Subject<AmTableSortInfo>();
  private sortedEvent = new Subject<AmTableSortInfo>();

  initEvent$ = this.initEvent.asObservable();
  sortEvent$ = this.sortEvent.asObservable();
  sortedEvent$ = this.sortedEvent.asObservable();

  init(event: AmTableSortInfo) {
    this.initEvent.next(event);
  }

  sort(event: AmTableSortInfo) {
    this.sortEvent.next(event);
  }

  sorted(event: AmTableSortInfo) {
    this.sortedEvent.next(event);
  }
}

export class AmTableColumnComponent {

}

@Component({
  selector: 'am-checkbox-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmCheckBoxColumnComponent) }]
})
export class AmCheckBoxColumnComponent extends AmTableColumnComponent {
  @Input() title: string;
  @Input() field: string;
}

@Component({
  selector: 'am-text-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableTextColumnComponent) }]
})
export class AmTableTextColumnComponent extends AmTableColumnComponent implements OnDestroy {
  @Input() title: string;
  @Input() field: string;
  @Input() allowSorting: boolean = false;
  @Input() formatType: string = "";
  @Input() format: string = "";
  @Input() cssClass: string;
  @Input() headingCssClass: string;

  previousSort: AmTableSort = AmTableSort.None;
  currentSort: AmTableSort = AmTableSort.None;
  subscriptionInit: Subscription;
  subscriptionSorted: Subscription;

  constructor(private service: AmTableSortCommunicationService) {
    super();
    this.subscriptionInit = service.initEvent$.subscribe(event => {
      if (event.field !== this.field) {
        this.currentSort = AmTableSort.None;
      }
      else {
        this.currentSort = event.direction;
        this.previousSort = this.currentSort;
      }
    });
    this.subscriptionSorted = service.sortedEvent$.subscribe(event => {
      if (event.field !== this.field) {
        this.currentSort = AmTableSort.None;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionInit.unsubscribe();
    this.subscriptionSorted.unsubscribe();
  }

  sort() {
    this.currentSort = (this.previousSort !== AmTableSort.Asc) ? AmTableSort.Asc : AmTableSort.Desc;
    this.previousSort = this.currentSort;
    this.service.sort(new AmTableSortInfo(this.field, this.currentSort));
  }
}

@Component({
  selector: 'am-styled-text-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableStyledTextColumnComponent) }]
})
export class AmTableStyledTextColumnComponent extends AmTableColumnComponent implements OnDestroy {


  @Input() title: string;
  @Input() field: string;
  @Input() allowSorting: boolean = false;
  @Input() formatType: string = "";
  @Input() format: string = "";

  @Input() descriptionField: string;
  @Input() iconField: string;
  @Input() tags: string[];

  previousSort: AmTableSort = AmTableSort.None;
  currentSort: AmTableSort = AmTableSort.None;
  subscriptionInit: Subscription;
  subscriptionSorted: Subscription;

  constructor(private service: AmTableSortCommunicationService) {
    super();

    this.subscriptionInit = service.initEvent$.subscribe(event => {
      if (event.field !== this.field) {
        this.currentSort = AmTableSort.None;
      }
      else {
        this.currentSort = event.direction;
        this.previousSort = this.currentSort;
      }
    });
    this.subscriptionSorted = service.sortedEvent$.subscribe(event => {
      if (event.field !== this.field) {
        this.currentSort = AmTableSort.None;
      }
    });
  }

  ngOnDestroy() {
    this.subscriptionInit.unsubscribe();
    this.subscriptionSorted.unsubscribe();
  }

  sort() {
    this.currentSort = (this.previousSort !== AmTableSort.Asc) ? AmTableSort.Asc : AmTableSort.Desc;
    this.previousSort = this.currentSort;
    this.service.sort(new AmTableSortInfo(this.field, this.currentSort));
  }
}

@Component({
  selector: 'am-badge-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableBadgeColumnComponent) }]
})
export class AmTableBadgeColumnComponent extends AmTableColumnComponent {
  @Input() title: string;
  @Input() field: string;
  @Input() badgeStyleField: string;
  @Input() formatType: string = "";
  @Input() format: string = "";
}

@Component({
  selector: 'am-progress-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableProgressColumnComponent) }]
})
export class AmTableProgressColumnComponent extends AmTableColumnComponent {
  @Input() title: string;
  @Input() valueField: number;
  @Input() headingCssClass: string;
  @Input() rowCssClass: string;
  @Input() maxField: number;
  @Input() percentageField: number;
  @Input() cssClass: string;
}

@Component({
  selector: 'am-button-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableButtonColumnComponent) }]
})
export class AmTableButtonColumnComponent extends AmTableColumnComponent {

  @Input() title: string;
  @Input() text: string;
  @Input() cssClass: string;
  @Input() showField: string = "true";
  @Input() headingCssClass: string;

  @Output() onClick = new EventEmitter<any>();
}

@Component({
  selector: 'am-link-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableLinkColumnComponent) }]
})
export class AmTableLinkColumnComponent extends AmTableColumnComponent {
  @Input() title: string;
  @Input() text: string;
  @Input() cssClass: string;
  @Input() showField: string = "true";
  @Input() route: string;
  @Input() keyField: string;
  @Input() headingCssClass: string;
}

@Component({
  selector: 'am-group-column',
  template: ``,
  providers: [{ provide: AmTableColumnComponent, useExisting: forwardRef(() => AmTableGroupColumnComponent) }]
})
export class AmTableGroupColumnComponent extends AmTableColumnComponent {
  @Input() title: string;
  @Input() headingCssClass: string;
  @ContentChildren(AmTableColumnComponent) groupedColumns: QueryList<AmTableColumnComponent>;
}

@Component({
  selector: 'am-table',
  template: `<div class="table-responsive table-scrollable"><table class="table table-striped table-bordered table-hover dataTable no-footer dtr-inline" *ngIf="dataSource">
  <thead>
    <tr>
      <th *ngFor="let column of columns" [ngClass]="column.headingCssClass">
        <span *ngIf="columnType(column) === amTableColumnType.Text || columnType(column) === amTableColumnType.StyledText" class="caption-highlight" [ngStyle]="column.headingCssClass">{{column.title}}
          <span *ngIf="column.allowSorting === true" class="float-right" (click)="column.sort()" [ngSwitch]="column.currentSort">
            <i *ngSwitchCase="amTableSort.None" class="fa fa-sort"></i>
            <i *ngSwitchCase="amTableSort.Asc" class="fa fa-sort-asc"></i>
            <i *ngSwitchCase="amTableSort.Desc" class="fa fa-sort-desc"></i>
          </span>
        </span>
        <span *ngIf="!(columnType(column) === amTableColumnType.Text || columnType(column) === amTableColumnType.StyledText)" class="caption-highlight" [ngStyle]="column.headingCssClass">{{column.title}}</span>
      </th>
    </tr>
  </thead>
  <tbody>
    <tr *ngFor="let row of dataSource.rows | async">
      <td *ngFor="let column of columns">
        <span *ngIf="columnType(column) === amTableColumnType.Text" [ngClass]="column.cssClass">{{format(row[column.field], column.formatType, column.format)}}</span>
        <div *ngIf="columnType(column) === amTableColumnType.StyledText" class="am-styled-column">
          <span class="am-styled-column-text"><i *ngIf="column.iconField" class="{{row[column.iconField]}}"></i>{{format(row[column.field], column.formatType, column.format)}}</span>
          <span *ngIf="column.descriptionField" class="am-styled-column-sub-text">{{row[column.descriptionField]}}</span>
          <span *ngFor="let tag of column.tags; let i = index" class="am-styled-column-tags" [ngClass]="row[tag].cssClass">{{row[tag].text}}</span>
        </div>
        <span *ngIf="columnType(column) === amTableColumnType.Badge" class="{{row[column.badgeStyleField]}}">{{format(row[column.field], column.formatType, column.format)}}</span>
        <progress *ngIf="columnType(column) === amTableColumnType.Progress" class="progress" [ngClass]="column.cssClass" [attr.value]="row[column.valueField]"
                    [attr.max]="row[column.maxField]">{{ row[column.percentageField] }}%
        </progress>
        <a *ngIf="columnType(column) === amTableColumnType.Button && row[column.showField]" class="{{column.cssClass}}" (click)="columnClick(row, column)">{{column.text}}</a>
        <a *ngIf="columnType(column) === amTableColumnType.Link" class="{{column.cssClass}}" [routerLink]="[column.route, row[column.keyField]]" >{{column.text}}</a>
        <div *ngIf="columnType(column) === amTableColumnType.Group" class="button-highlight">
          <ng-template ngFor let-gColumn [ngForOf]="column.groupedColumns">
            <a *ngIf="columnType(gColumn) === amTableColumnType.Button && row[gColumn.showField]" class="{{gColumn.cssClass}}" (click)="columnClick(row, gColumn)" [ngStyle]="gColumn.headingCssClass">{{gColumn.text}}</a>
            <a *ngIf="columnType(gColumn) === amTableColumnType.Link" class="{{gColumn.cssClass}}" [routerLink]="[gColumn.route, row[gColumn.keyField]]" [ngStyle]="gColumn.headingCssClass">{{gColumn.text}}</a>
          </ng-template>
        </div>
      </td>
    </tr>
    <tr *ngIf="dataSource.rows.length == 0">
      <td>
        No Matching record found
      </td>
    </tr>
  </tbody>
</table>
</div>
<nav *ngIf="allowPaging">
  <ul class="pagination float-right">
    <li class="page-item" [class.disabled] = "isFirstPage()">
      <a class="page-link" aria-label="Previous" (click)="gotoPrevPage()">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="page-item" [class.disabled]="page === '...'" [class.active]="page === dataSource.currentPage" *ngFor="let page of pagination">
        <a class="page-link" (click)="gotoPage(page)">{{ page }}</a>
      </li>
    <li class="page-item" [class.disabled] = "isLastPage()">
      <a class="page-link" aria-label="Next" (click)="gotoNextPage()">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>`
})
export class AmTableComponent implements OnInit, AfterViewInit, OnDestroy {

  amTableSort = AmTableSort;
  amTableColumnType = AmTableColumnType;

  @Input() dataSource = <IAmTableDataSource>null;
  @Input() allowPaging: boolean;
  @ContentChildren(AmTableColumnComponent) columns: QueryList<AmTableColumnComponent>;

  pagination: AmTablePagination;
  paginationSubscription: Subscription = null;

  service: AmTableSortCommunicationService;
  subscription: Subscription;

  constructor(service: AmTableSortCommunicationService) {
    this.service = service;

    this.subscription = service.sortEvent$.subscribe(event => {
      service.sorted(event);
      this.dataSource.changeSort(event);
    });
  }

  setPaginationTheme(page: number) {

  }

  ngOnInit() {
    if (Validate.isNull(this.dataSource)) return;
    this.dataSource.refresh();
    if (this.allowPaging) {
      this.paginationSubscription = this.dataSource.pagesObservable.subscribe(pagination => this.pagination = pagination);
    }

    let sortInfo: AmTableSortInfo = this.dataSource.sort;
    if (Validate.isNotNull(sortInfo)) this.service.init(sortInfo);
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    if (Validate.isNotNull(this.paginationSubscription)) this.paginationSubscription.unsubscribe();
    this.subscription.unsubscribe();
  }

  private format(value: any, formatType: string = "", format: string = "") {
    switch (formatType) {
      case "number":
        return Converter.format(value, formatType);
      case "datetime":
        return DateTimeConverter.fromTimestamp(value, format);
      default:
        return value;
    }
  }

  private columnType(column: AmTableColumnComponent): AmTableColumnType {
    if (column instanceof AmTableTextColumnComponent)
      return AmTableColumnType.Text;
    else if (column instanceof AmTableStyledTextColumnComponent)
      return AmTableColumnType.StyledText;
    else if (column instanceof AmTableBadgeColumnComponent)
      return AmTableColumnType.Badge;
    else if (column instanceof AmTableProgressColumnComponent)
      return AmTableColumnType.Progress;
    else if (column instanceof AmTableButtonColumnComponent)
      return AmTableColumnType.Button;
    else if (column instanceof AmTableLinkColumnComponent)
      return AmTableColumnType.Link;
    else if (column instanceof AmTableGroupColumnComponent)
      return AmTableColumnType.Group;
    else if (column instanceof AmCheckBoxColumnComponent)
      return AmTableColumnType.Checkbox;
    else
      return AmTableColumnType.None;
  }

  private columnClick(rowData: any, bColumn: AmTableButtonColumnComponent) {
    bColumn.onClick.emit(rowData);
  }

  isFirstPage(): boolean {
    return this.dataSource.currentPage === 1;
  }

  isLastPage(): boolean {
    return (this.dataSource.currentPage === this.dataSource.pages);
  }

  gotoPrevPage() {
    this.dataSource.gotoPrevPage();
  }

  gotoNextPage() {
    this.dataSource.gotoNextPage();
  }

  gotoPage(pageNumber: number) {
    this.dataSource.gotoPage(pageNumber);
  }

}
