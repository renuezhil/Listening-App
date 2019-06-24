import {Pipe, PipeTransform, Injectable} from "@angular/core";
import {Converter} from "./data-converter";
import {DateTimeHelper} from "./date-time";

var tagMatchRegEx = /<([^>]+)>/g;

@Pipe({name: 'keys'})
export class KeysPipe implements PipeTransform {
  transform(value, args: string[]): any {
    let keys = [];
    for (var enumMember in value) {
      var isValueProperty = parseInt(enumMember, 10) >= 0
      if (isValueProperty) {
        keys.push({key: enumMember, value: value[enumMember]});
      }
    }
    return keys;
  }
}

@Pipe({
  name: 'dateFormat'
})
@Injectable()
export class DateFormatPipe implements PipeTransform {
  transform(value, format: string): any {
    return DateTimeHelper.fromTimestamp(value, format);
  }
}

@Pipe({
  name: 'activityFormat'
})
@Injectable()
export class ActivityContentPipe implements PipeTransform {
  transform(value): any {
    return value.replace(tagMatchRegEx, "<span class=\"color-info\">$1</span>");
  }
}


@Pipe({name: 'splitUpperCaseWord'})
@Injectable()
export class SplitUpperCaseWord implements PipeTransform {
  transform(value: any) {
    if (value) {
      return value.replace(/([a-z])([A-Z])/g, '$1 $2');
    }
    return value;
  }

}

@Pipe({name: 'splitWordWithDash'})
@Injectable()
export class SplitWordWithDash implements PipeTransform {
  transform(value: any) {
    if (value) {
      return value.replace(/([a-z]*)([_])/g, '$1 ');
    }
    return value;
  }

}
