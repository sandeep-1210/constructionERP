
import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  currentUser: User;
  users = [];

  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
   
    const user = this.loadAllUsers();    
    
    return user;
  }

  deleteUser(id: number) {
    this.userService.delete(id)
      .pipe(first())
      .subscribe(() => this.loadAllUsers());
  }

  private loadAllUsers() {
    const result  = this.userService.getAll().pipe(first()).subscribe(users => this.users = users);
    console.log("loadallusers", result);
    return result;
  } 
}