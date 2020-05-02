import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AuthenticationService } from 'src/_services/authentication.service';
import { UserService } from 'src/_services/user.service';
import { SupplierService } from 'src/_services/supplier.service';
import { from } from 'rxjs';
import { AlertService } from 'src/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrls: ['./supplier-list.component.css']
})
export class SupplierListComponent implements OnInit {

  currentUser: User;
  supplier = [];
  public data: any
  public searchTxt: any;

  supplierlist: any[] = [];
  public popoverTitle: string = 'Delete Confirmation';
  public popoverMessage: string = 'Are you really sure you want to delete this Supplier';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private supplierService: SupplierService,
    private alertService: AlertService,
    private _router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this._getAllSupplier();
  }

  ngOnInit() {

  }

  private _getAllSupplier() {
    this.supplierService.getAll().subscribe(item => {
      this.supplierlist = item.data;
      console.log(this.supplierlist);
      return this.supplierlist;
    },
      (error: any) => {
        
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  private _deleteSupplier(id : any){
    this.supplierService.delete(id).subscribe(item => {
      if (item.error || item.message) {
        const message = item.error ? item.error.message : item.message;
        alert(message + "  :-  " + id);   
        return;     
      }
      this._getAllSupplier();
    },
      (error: any) => {
        
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  editSupplier(id: any) {
    this._router.navigate(['/editSupplier', id]);
  }

  deleteSupplier(id: any) {   
       
    this._deleteSupplier(id);
  }
}
