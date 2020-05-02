import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  AdminLogo = "http://localhost:4200/assets/images/AdminLogo.png";
  CustomerLogo = "http://localhost:4200/assets/images/avatar5.png";
  LoginUser ;

  constructor() { 
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.LoginUser = currentUser.loginUser;
  }

  ngOnInit() {
  }


}
