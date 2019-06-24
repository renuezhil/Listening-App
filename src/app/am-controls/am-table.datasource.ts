import {BehaviorSubject, Observable} from "rxjs/Rx";
import {AmTableSortInfo, AmTablePagination, PagedResult} from "./am-table.models";
import {Validate} from "../utilities/data-validator";

export interface IAmTableDataSource {
  currentPage: number;
  pages : number;
  pagesObservable: Observable<AmTablePagination>;
  sort: AmTableSortInfo;

  gotoNextPage();
  gotoPrevPage();
  gotoPage(pageNumber: number);
  changeSort(sort: AmTableSortInfo);
  refresh();
}

export class AmTableDataSource<T> implements IAmTableDataSource {

  private _rows: BehaviorSubject<Array<T>> = new BehaviorSubject(new Array<T>());
  private _pages: number = 0;
  private _pagesObservable: BehaviorSubject<AmTablePagination> = new BehaviorSubject(AmTablePagination.pagination(1, 0));
  private _currentPage: number = 1;

  protected _sort: AmTableSortInfo;
  protected _onDataCallbackFn: (sort: AmTableSortInfo, page: number) => Observable<PagedResult>;



  constructor(initialSort: AmTableSortInfo, onDataCallbackFn: (sort: AmTableSortInfo, page: number) => Observable<PagedResult>) {
    this._sort = initialSort;
    this._onDataCallbackFn = onDataCallbackFn;
  }

  get rows() {
    return this._rows.asObservable();
  }

  get pages() : number {
    return this._pages;
  }

  get pagesObservable() : Observable<AmTablePagination> {
    return this._pagesObservable.asObservable();
  }

  get currentPage() : number {
    return this._currentPage;
  }

  get sort() : AmTableSortInfo {
    return this._sort;
  }

  gotoNextPage() {
    return this.gotoPage(this.currentPage+1);
  }

  gotoPrevPage() {
    return this.gotoPage(this.currentPage-1);
  }

  gotoPage(pageNumber: number) {
    this._currentPage = pageNumber;
    return this.getData();
  }

  changeSort(sort: AmTableSortInfo) {
    this._sort = sort;
    return this.getData();
  }

  refresh() {
    this._currentPage = 1;
    return this.getData();
  }

  private getData() {
    if( Validate.isNull(this._onDataCallbackFn)) return null;

    return this._onDataCallbackFn(this._sort, this._currentPage).subscribe(
      (pagedResult: PagedResult) => {
        this._rows.next(pagedResult.data);
        this._pages = pagedResult.totalPages;
        this._pagesObservable.next(AmTablePagination.pagination(this._currentPage, this._pages));
      },
      error => console.log(error)
    );
  }

}
