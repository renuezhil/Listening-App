export enum AmTableSort {
  None,
  Asc,
  Desc
}

export enum AmTableColumnType {
  None,
  Checkbox,
  Text,
  StyledText,
  Badge,
  Button,
  Link,
  Progress,
  Group
}

export class AmTableSortInfo {
  field: string;
  direction: AmTableSort;

  constructor(field: string, direction: AmTableSort) {
    this.field = field;
    this.direction = direction;
  }
}

export class AmTableTagData {
  text: string;
  cssClass: string;

  constructor(options: {
    text?: string,
    cssClass?: string
  } = {}) {
    this.text = options.text
    this.cssClass = options.cssClass
  }
}

export class AmTablePagination {
  static pagination(c, m) : Array<string> {
    var current = c,
      last = m,
      delta = 2,
      left = current - delta,
      right = current + delta + 1,
      range = [],
      rangeWithDots = [],
      l;

    for (let i = 1; i <= last; i++) {
      if (i == 1 || i == last || i >= left && i < right) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  }
}

export class BaseSearch {
  pageNumber: number = 1;
  pageSize: number = 10;
  sortField: string;
  sortDirection: AmTableSort;

  setSort(sort: AmTableSortInfo) {
    this.sortField = sort.field;
    this.sortDirection = sort.direction;
  }
}

export class PagedResult {
  totalPages: number;
  data: any;

  constructor(totalPages: number, data: any) {
    this.totalPages = totalPages;
    this.data = data;
  }
}
