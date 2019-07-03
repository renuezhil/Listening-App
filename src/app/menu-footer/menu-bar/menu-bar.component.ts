import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  constructor(private router: Router) {



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
    },
    {
      url: "profile",
      label: "Profile"
    },
    {
      url: "treding",
      label: "Treding"
    }
  ]

}
