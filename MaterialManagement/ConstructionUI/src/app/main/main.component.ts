import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/_services/authentication.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  currentUser: User;
  AdminLogo = "http://localhost:4200/assets/images/AdminLogo.png";
  CustomerLogo = "http://localhost:4200/assets/images/avatar5.png";

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
      console.log("@@@@@@@@@" + this.currentUser);
  }
  ngOnInit(){
    
  }

  logout() {
      this.authenticationService.logout();
      this.router.navigate(['/login']);
  }
}
