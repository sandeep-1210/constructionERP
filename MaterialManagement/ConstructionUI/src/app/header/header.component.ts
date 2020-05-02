import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/_services/alert.service';
import { AuthenticationService } from 'src/_services/authentication.service';
import { User } from 'src/_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }
  logOut() {
    this.authenticationService.logout();
  }
}
