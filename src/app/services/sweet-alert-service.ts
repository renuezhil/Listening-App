import {Injectable} from "@angular/core";

declare var swal: any;

const defaultSuccess = () => {} ;
const defaultReject = (dismiss: string) => {};

@Injectable()
export class SweetAlertService {

  warning(options: {
    title?: string,
    text?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    customClass?: string
  } = {}, successFn: () => void = defaultSuccess, rejectFn: (dismiss: string) => void = defaultReject) : void {
      options["type"] = "warning";
      options["showCancelButton"] = true;
      options["allowOutsideClick"] = false;
      swal(options, successFn, rejectFn);
  }

  info(options: {
    title?: string,
    text?: string,
    confirmButtonText?: string,
    customClass?: string
  } = {}, successFn: () => void = defaultSuccess) : void {
    options["type"] = "info";
    options["showCancelButton"] = false;
    options["allowOutsideClick"] = false;
    swal(options, successFn, defaultReject);
  }

  warningSweetAlert(options: {
    title?: string,
    text?: string,
    confirmButtonText?: string,
    cancelButtonText?: string,
    customClass?: string
  } = {}, successFn: (isConfirm: boolean) => void = defaultSuccess, rejectFn: (dismiss: string) => void = defaultReject) : void {
      options["type"] = "warning";
      options["showCancelButton"] = true;
      options["allowOutsideClick"] = false;
      swal(options, successFn);
  }
}
