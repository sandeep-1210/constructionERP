import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AuthenticationService } from 'src/_services/authentication.service';
import { UserService } from 'src/_services/user.service';
import { BrandService } from 'src/_services/brand.service';
import { from } from 'rxjs';
import { AlertService } from 'src/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.css']
})
export class BrandListComponent implements OnInit {

  currentUser: User;
  brand = [];
  public data: any
  public searchTxt: any;

  brandlist: any[] = [];
  public popoverTitle: string = 'Delete Confirmation';
  public popoverMessage: string = 'Are you really sure you want to delete this brand';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private brandService: BrandService,
    private alertService: AlertService,
    private _router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this._getAllBrands();
  }

  ngOnInit() {

  }

  private _getAllBrands() {
    this.brandService.getAll().subscribe(item => {
      this.brandlist = item.data;
      console.log(this.brandlist);
      return this.brandlist;
    },
      (error: any) => {
       
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  private _deleteBrand(id : any){
    this.brandService.delete(id).subscribe(item => {
      if (item.error || item.message) {
        const message = item.error ? item.error.message : item.message;
        alert(message + "  :-  " + id);   
        return;     
      }
      this._getAllBrands();
    },
      (error: any) => {
       
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  editBrand(id: any) {
    this._router.navigate(['/editBrand', id]);
  }

  deleteBrand(id: any) {   
       
    this._deleteBrand(id);
  }
}