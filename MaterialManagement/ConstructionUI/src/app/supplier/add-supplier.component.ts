import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/_services/authentication.service';
import { User } from 'src/_models/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/_services/alert.service';
import { SupplierService } from 'src/_services/supplier.service';

@Component({
  selector: 'app-add-supplier',
  templateUrl: './add-supplier.component.html',
  styleUrls: ['./add-supplier.component.css']
})
export class AddSupplierComponent implements OnInit {

  currentUser: User;
  supplierForm: FormGroup;
  supplierValue: any;
  loading = false;
  submitted = false;
  returnUrl: string;
  result = false;
  responseMessage: string;
  supplierLabel = "Add Supplier";
  supplierbtn = "Add";
  paramId: string;
  categorylist: any[] = [];
  unitofmeasuresubmitted = false;
  categorynamesubmitted = false;
  suppliernamesubmitted = false;
  supplierdisabled = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private supplierService: SupplierService,
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

    this.supplierForm = this.formBuilder.group({
      suppliername: ['', Validators.required],
      mobile: ['', Validators.required],
      fulladdresss: ['', Validators.required],
      address: ['', Validators.required],
      emailid: [],
      companyname: ['', Validators.required]
    });
  }

  private getSupplier(id: any) {
    if (id == 0) {
      this.supplierdisabled = false;
      this.supplierLabel = "Add Supplier";
      this.supplierbtn = "Add";
      // Resetting the form, resets any previous validation errors
      if (this.supplierForm) this.supplierForm.reset();

    } else {
      this.supplierdisabled = true;
      this.supplierService.get(id).subscribe(item => {
        this.supplierValue = item.data;
        if (item.error || item.message) {
          const message = item.error ? item.error.message : item.message;
          alert(message + "  :-  " + id);
          this.router.navigate(['/edit/0']);
        }
        console.log(this.supplierValue);
       
        this.supplierLabel = "Update Supplier";
        this.supplierbtn = "Update";
        this.supplierForm.setValue({
          companyname: this.supplierValue.companyname,
          suppliername: this.supplierValue.suppliername,
          mobile: this.supplierValue.mobile,
          emailid: this.supplierValue.emailid,
          fulladdresss: this.supplierValue.fulladdresss,
          address: this.supplierValue.address
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
  get f() { return this.supplierForm.controls; }

  onSubmit() {
    this.submitted = true;
    // reset alerts on submit
    this.alertService.clear();
   
    // stop here if form is invalid
    if (this.supplierForm.invalid) {
      return;
    }

    var obj = {
      "companyname": this.f.companyname.value,
      "suppliername": this.f.suppliername.value,
      "mobile": this.f.mobile.value,
      "emailid": this.f.emailid.value,
      "fulladdresss": this.f.fulladdresss.value,
      "address": this.f.address.value
    }

    this.loading = true;
    if (this.supplierbtn == "Add") {
      this.supplierService.save(obj).subscribe(
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
            this.supplierForm.reset();
            this.router.navigate(['/supplierList']);
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
      this.supplierService.update(obj, this.paramId).subscribe(
        (data) => {
          if (data) {
            this.loading = false;
            if (data.error) {
              this.alertService.error(data.error.message);
              return null;
            }
            this.supplierForm.reset();
            this.responseMessage = data.message;
            this.result = true;
            this.alertService.success(data.message);
            this.router.navigate(['/supplierList']);
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