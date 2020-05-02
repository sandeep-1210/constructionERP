import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/_services/authentication.service';
import { User } from 'src/_models/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/_services/alert.service';
import { BrandService } from 'src/_services/brand.service';

@Component({
  selector: 'app-add-update-brand',
  templateUrl: './add-update-brand.component.html',
  styleUrls: ['./add-update-brand.component.css']
})
export class AddUpdateBrandComponent implements OnInit {

  currentUser: User;
  brandForm: FormGroup;
  brandValue: any;
  loading = false;
  submitted = false;
  returnUrl: string;
  result = false;
  responseMessage: string;
  brandLabel = "Add Brand";
  brandbtn = "Add";
  paramId: string;   
  branddisabled = false; 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private brandService: BrandService,
    private alertService: AlertService,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.paramId = params['id'];
      this.getSupplier(params['id']);
    });

    this.brandForm = this.formBuilder.group({
      brandname: ['', Validators.required],
      branddescription: []      
    });
  }

  private getSupplier(id: any) {
    if (id == 0) {
      this.branddisabled = false;
      this.brandLabel = "Add Brand";
      this.brandbtn = "Add";
      // Resetting the form, resets any previous validation errors
      if (this.brandForm) this.brandForm.reset();

    } else {
      this.branddisabled = true;
      this.brandService.get(id).subscribe(item => {
        this.brandValue = item.data;
        if (item.error || item.message) {
          const message = item.error ? item.error.message : item.message;
          alert(message + "  :-  " + id);
          this.router.navigate(['/edit/0']);
        }
        console.log(this.brandValue);
        
        this.brandLabel = "Update Supplier";
        this.brandbtn = "Update";
        this.brandForm.setValue({
          brandname: this.brandValue.brandname,
          branddescription: this.brandValue.branddescription,          
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
  get f() { return this.brandForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
    
    // stop here if form is invalid
    if (this.brandForm.invalid) {
      return;
    }

    var obj = {
      "brandname": this.f.brandname.value,
      "branddescription": this.f.branddescription.value    
    }

    this.loading = true;
    if (this.brandbtn == "Add") {
      this.brandService.save(obj).subscribe(
        (data) => {
          if (data) {
            
            console.log(data);
            this.loading = false;
            if (data.error) {
              this.alertService.error(data.error.message);
              return null;
            }
            this.responseMessage = data.message;
            this.result = true;
            this.alertService.success(data.message);
            this.brandForm.reset();
            this.router.navigate(['/brandList']);
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
      this.brandService.update(obj, this.paramId).subscribe(
        (data) => {
          if (data) {
            this.loading = false;
            if (data.error) {
              this.alertService.error(data.error.message);
              return null;
            }
            this.brandForm.reset();
            this.responseMessage = data.message;
            this.result = true;
            this.alertService.success(data.message);
            this.router.navigate(['/brandList']);
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