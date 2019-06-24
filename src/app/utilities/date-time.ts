
import * as moment from 'moment/moment';

export class UnixDateRange {
  start: number;
  end: number;
}

export class DateTimeHelper {

  public static DATETIME_FORMAT: string = "MM/DD/YYYY HH:mm:ss";
  public static DATETIMEAMPM_FORMAT: string = "MM/DD/YYYY HH:mm A";
  public static DATE_FORMAT: string = "MM/DD/YYYY";
  public static DATE_FORMAT_WITH_HYPHEN: string = "YYYY-MM-DD";


  // TODO: Check for user timezone

  static getCurrentTime(inMilliSeconds: boolean = false) : number {
    return (inMilliSeconds) ? moment().valueOf() : moment().unix();
  }

  static getCurrentDateString() : string {
    return moment().format(DateTimeHelper.DATE_FORMAT);
  }

  static toTimestamp(valueAsString: any, format: string, inMilliSeconds: boolean = false) : number {
    return (inMilliSeconds) ? moment(valueAsString, format).valueOf() : moment(valueAsString, format).unix();
  }

  static fromTimestamp(timestamp: number, format: string) : string {
    return moment.unix(timestamp).format(format);
  }

  static toDateString(value: any, format: string = DateTimeHelper.DATE_FORMAT) {
    return moment(value).format(format);
  }

  static isAfter(valueAsString: string, format: string = DateTimeHelper.DATE_FORMAT) : boolean {
    return moment().isAfter(moment(valueAsString, format));
  }

  static createUnixDateRange(duration: string, inMilliSeconds: boolean = false) : UnixDateRange {
    let range: UnixDateRange = new UnixDateRange();
    let start: any;
    let end: any;
    var dateFormat = "MM-DD-YYYY HH:00:00";
    switch (duration) {
      case "today":
        dateFormat = "MM-DD-YYYY HH:mm:ss";
        start = moment().startOf('day');
        end = moment();
        break;
      case "currentMonth":
        dateFormat = "MM-DD-YYYY HH:mm:ss";
        start = moment(moment().format("YYYY-MM-01"), DateTimeHelper.DATE_FORMAT_WITH_HYPHEN);
        end = moment(moment().format("YYYY-MM-") + moment().daysInMonth(), DateTimeHelper.DATE_FORMAT_WITH_HYPHEN);
        break;
      case "lastWeek":
        dateFormat = "MM-DD-YYYY HH:mm:ss";
        start = moment().subtract(1, 'weeks').startOf('weeks');
        end = moment();
        break;
      case "lastMonth":
        dateFormat = "MM-DD-YYYY HH:mm:ss";
        start = moment().subtract(1, "month").startOf('month');
        end = moment();
        break;
      case "last6Months":
        dateFormat = "MM-DD-YYYY HH:mm:ss";
        start = moment().subtract(6, "month").startOf('month');
        end = moment();
        break;
      case "1d":
        dateFormat = "MM-DD-YYYY HH:mm:00";
        start = moment().utc().subtract(1, 'days');
        end = moment().utc();
        break;
      case "2d":
        dateFormat = "MM-DD-YYYY HH:mm:00";
        start = moment().utc().subtract(2, 'days');
        end = moment().utc();
        break;
      case "5d":
        start = moment().utc().subtract(5, 'days');
        end = moment().utc();
        break;
      case "1m":
        start = moment().utc().subtract(1, 'months');
        end = moment().utc();
        break;
      case "3m":
        start = moment().utc().subtract(3, 'months');
        end = moment().utc();
        break;
      case "6m":
        start = moment().utc().subtract(6, 'months');
        end = moment().utc();
        break;
      case "1yr":
        start = moment().utc().subtract(1, 'years');
        end = moment().utc();
        break;
      case "5yr":
        start = moment().utc().subtract(5, 'years');
        end = moment().utc();
        break;
      case "Monthly":
        start = moment().utc().subtract(12, 'months');
        end = moment().utc().add(5, 'months');
        break;
      case "Weekly":
        start = moment().utc().subtract(3, 'months');
        end = moment().utc().add(1, 'months');
        break;
      case "Daily":
        start = moment().utc().subtract(10, 'days');
        end = moment().utc().add(5, 'days');
        break;
      default:
        dateFormat = "MM-DD-YYYY HH:00:00";
        start = moment().utc().subtract(1, 'days');
        end = moment().utc();
        break;
    }
    range.start = (inMilliSeconds) ?  moment(start.format(dateFormat), dateFormat).valueOf() : moment(start.format(dateFormat), dateFormat).unix();
    range.end = (inMilliSeconds) ?  moment(end.format(dateFormat), dateFormat).valueOf() : moment(end.format(dateFormat), dateFormat).unix();
    return range;
  }

  static createUnixDateRangeFrom(from: number, durationInSeconds: number, inMilliSeconds: boolean = false) : UnixDateRange {
    let range: UnixDateRange = new UnixDateRange();
    range.start = moment.unix(from).add(durationInSeconds, 'seconds').unix();
    range.end = from;
    if(inMilliSeconds) {
      range.start = moment.unix(range.start).valueOf();
      range.end = moment.unix(range.end).valueOf();
    }
    return range;
  }

}