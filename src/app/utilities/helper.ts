import {Validate} from "./data-validator";

export class ArrayHelper {

  static arrayHasValue(value:any) : boolean {
    return Validate.isNotNull(value) && value.length > 0;
  }

  static remove(valueToRemove: any, from: Array<any>) : boolean {
    if(!ArrayHelper.arrayHasValue(from)) return false;

    var indexToDelete = -1;
    from.forEach((value, index, array) => {
      if (value === valueToRemove) {
        indexToDelete = index;
        return;
      }
    });
    if (indexToDelete >= 0) {
      from.splice(indexToDelete, 1);
      return true;
    }
    else
      return false;
  }

  static removeWithCallback(from: Array<any>, callback: (item: any) => boolean) : boolean {
    if(!ArrayHelper.arrayHasValue(from)) return false;

    var indexToDelete = -1;
    from.forEach((value, index) => {
      if (callback(value)) {
        indexToDelete = index;
        return;
      }
    });
    if (indexToDelete >= 0) {
      from.splice(indexToDelete, 1);
      return true;
    }
    else
      return false;
  }

  static contains(value:any, items:Array<any>) : boolean {
    if(!ArrayHelper.arrayHasValue(items)) return false;

    var indexOfValue = -1;
    items.forEach((item, index) => {
      if (item === value) {
        indexOfValue = index;
        return;
      }
    });
    return indexOfValue !== -1;
  }

  static containsWithCallback(items: Array<any>, callback: (item: any) => boolean) : boolean {
    if(!ArrayHelper.arrayHasValue(items)) return false;

    var indexOfValue = -1;
    items.forEach((item, index) => {
      if (callback(item)) {
        indexOfValue = index;
        return;
      }
    });
    return indexOfValue !== -1;
  }

  static getWithCallBack(items: Array<any>, callback: (item: any) => boolean) : any {
    if(!ArrayHelper.arrayHasValue(items)) return null;

    var indexOfValue = -1;
    items.forEach((item, index) => {
      if (callback(item)) {
        indexOfValue = index;
        return;
      }
    });
    return indexOfValue !== -1 ? items[indexOfValue] : null;
  }
}
