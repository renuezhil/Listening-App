import { Component, ViewContainerRef, OnInit } from '@angular/core';
import { Router, NavigationEnd } from "@angular/router";
import {ToastrService} from './services/toastr.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router, private toastr : ToastrService) {
  }

  ngOnInit() {
    this.router.events.subscribe((e) => {
      if (!(e instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }

}
