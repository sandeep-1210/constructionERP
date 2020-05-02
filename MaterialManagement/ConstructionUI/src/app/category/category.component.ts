import { Component, OnInit } from '@angular/core';
import { User } from 'src/_models/user';
import { AuthenticationService } from 'src/_services/authentication.service';
import { UserService } from 'src/_services/user.service';
import { CategoryService } from 'src/_services/category.service'
import { from } from 'rxjs';
import { AlertService } from 'src/_services/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit {

  currentUser: User;
  category = [];
  public data: any
  public searchTxt: any;

  categorylist: any[] = [];
  public popoverTitle: string = 'Delete Confirmation';
  public popoverMessage: string = 'Are you really sure you want to delete this category';
  public confirmClicked: boolean = false;
  public cancelClicked: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private _router: Router
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this._getAllCategory();
  }

  ngOnInit() {

  }

  private _getAllCategory() {
    this.categoryService.getAll().subscribe(item => {
      this.categorylist = item.data;
      console.log(this.categorylist);
      return this.categorylist;
    },
      (error: any) => {
        
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  private _deleteCategory(id : any){
    this.categoryService.delete(id).subscribe(item => {
      if (item.error || item.message) {
        const message = item.error ? item.error.message : item.message;
        alert(message + "  :-  " + id);   
        return;     
      }
      this._getAllCategory();
    },
      (error: any) => {
        
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  editCategory(id: any) {
    this._router.navigate(['/edit', id]);
  }

  deleteCategory(id: any) {    
    // if(confirm("Are you sure to delete "+id)) {
    //   this._deleteCategory(id);
    // }
    this._deleteCategory(id);
  }
}