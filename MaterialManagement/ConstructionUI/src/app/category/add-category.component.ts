import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/_services/authentication.service';
import { User } from 'src/_models/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/_services/alert.service';
import { CategoryService } from 'src/_services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  currentUser: User;
  categoryForm: FormGroup;
  categoryValue: any;
  loading = false;
  submitted = false;
  returnUrl: string;
  result = false;
  responseMessage: string;
  categoryLabel = "Add Category";
  categorybtn = "Add";
  paramId: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.paramId = params['id'];
      this.getCategory(params['id']);
    });

    this.categoryForm = this.formBuilder.group({
      categoryname: ['', Validators.required],
      categorydesc: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
  }

  private getCategory(id: any) {
    if (id == 0) {
      this.categoryLabel = "Add Category";
      this.categorybtn = "Add";
      // Resetting the form, resets any previous validation errors
      if (this.categoryForm) this.categoryForm.reset();

    } else {
      this.categoryService.get(id).subscribe(item => {
        this.categoryValue = item.data;
        if (item.error || item.message) {
          const message = item.error ? item.error.message : item.message;
          alert(message + "  :-  " + id);
          this.router.navigate(['/edit/0']);
        }
        console.log(this.categoryValue);
        this.categoryLabel = "Update Category";
        this.categorybtn = "Update";
        this.categoryForm.setValue({
          categoryname: this.categoryValue.categoryname,
          categorydesc: this.categoryValue.categorydesc
        });
      },
        (error: any) => {

          this.alertService.error(error);
          console.log(error);
        }
      );


    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.categoryForm.controls; }

  onSubmit() {
    this.submitted = true;

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      return;
    }

    var obj = {
      "categoryname": this.f.categoryname.value,
      "categorydesc": this.f.categorydesc.value
    }

    this.loading = true;
    if (this.categorybtn == "Add") {
      this.categoryService.save(obj).subscribe(
        (data) => {
          if (data) {
            console.log(data);
            this.loading = false;
            this.categoryForm.reset();
            this.responseMessage = data.message;
            this.result = true;
            alert(data.message);
            this.alertService.success(data.message);            
            this.router.navigate(['/categoryList']);            
          }
          else {
            this.alertService.error(data);
            this.loading = false;
          }
        },
        (error: any) => {

          this.alertService.error(error);
          this.loading = false;
          console.log(error);
        }
      );
    }
    else {
      // Update Category     
      this.categoryService.update(obj, this.paramId).subscribe(
        (data) => {
          if (data) {
            this.loading = false;
            this.categoryForm.reset();
            this.responseMessage = data.message;
            this.result = true;           
            this.alertService.success(data.message);            
            this.router.navigate(['/categoryList']);              
          }
          else {
            this.alertService.error(data);
            this.loading = false;
          }
        },
        (error: any) => {

          this.alertService.error(error);
          this.loading = false;
          console.log(error);
          alert("something went wrong please try again");
        }
      );
    }
  }  

}
