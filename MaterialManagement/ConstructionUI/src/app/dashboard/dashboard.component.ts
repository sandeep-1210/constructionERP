import { Component, OnInit } from '@angular/core';

import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }
  ngOnInit() {
  }

}
