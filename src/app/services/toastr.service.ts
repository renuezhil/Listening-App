import { Injectable } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';

@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(private toastr: ToastrManager) { }

  success(message, title) {
    this.toastr.successToastr(message, title, {animate: 'fade'});
  }

  error(message, title) {
    this.toastr.errorToastr(message, title, {animate: 'fade'});
  }
}