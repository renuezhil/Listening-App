import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor() {



  }

  ngOnInit() {

  }
  test: string = "as";
  menuItem: any = [
    {
      url: "home",
      label: "Home",
      isActive: true
    }, {
      url: "about",
      label: "About"
    }, {
      url: "contact-us",
      label: "Contact Us"
    }, {
      url: "login",
      label: "Log out"
    }
  ]

}
