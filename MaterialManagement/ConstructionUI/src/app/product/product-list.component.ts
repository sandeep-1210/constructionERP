import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AuthenticationService } from 'src/_services/authentication.service';
import { UserService } from 'src/_services/user.service';
import { ProductService } from 'src/_services/product.service'
import { from } from 'rxjs';
import { AlertService } from 'src/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  currentUser: User;
  category = [];
  public data: any
  public searchTxt: any;

  productlist: any[] = [];
  public popoverTitle: string = 'Delete Confirmation';
  public popoverMessage: string = 'Are you really sure you want to delete this category';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private alertService: AlertService,
    private _router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this._getAllProduct();
  }

  ngOnInit() {

  }

  private _getAllProduct() {
    this.productService.getAll().subscribe(item => {
      this.productlist = item.data;
      console.log(this.productlist);
      return this.productlist;
    },
      (error: any) => {
       
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  private _deleteProduct(id : any){
    this.productService.delete(id).subscribe(item => {
      if (item.error || item.message) {
        const message = item.error ? item.error.message : item.message;
        alert(message + "  :-  " + id);   
        return;     
      }
      this._getAllProduct();
    },
      (error: any) => {
       
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  editProduct(id: any) {
    this._router.navigate(['/editProduct', id]);
  }

  deleteProduct(id: any) {   
    this._deleteProduct(id);
  }
}