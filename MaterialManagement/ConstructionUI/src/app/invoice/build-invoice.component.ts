import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/_services/authentication.service';
import { User } from 'src/_models/user';
import { NgForm, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/_services/alert.service';
import { CustomerService } from 'src/_services/customer.service';
import { ProductService } from 'src/_services/product.service'

@Component({
  selector: 'app-build-invoice',
  templateUrl: './build-invoice.component.html',
  styleUrls: ['./build-invoice.component.css']
})
export class BuildInvoiceComponent implements OnInit {

  currentUser: User;
  invoiceForm: FormGroup;
  customerValue: any;
  customermobile: string;
  productlist: any[] = [];
  productvalue: any;
  submitted = false;

  constructor(
    private authenticationService: AuthenticationService,
    private customerService: CustomerService,
    private productService: ProductService,
    private alertService: AlertService,
    private formBuilder: FormBuilder,
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this._getAllProduct();
  }

  ngOnInit() {

    this.invoiceForm = this.formBuilder.group({
      userGroup: this.formBuilder.group({
        customername: ['', Validators.required],
        customermobile: ['', Validators.required],
        customeraddress: ['', Validators.required],
        customeremail: [],
      }),
      itemname: [0, Validators.required],
      unitofmeasure: [0, Validators.required],
      quantity: ['', Validators.required],
      price: ['', Validators.required],
      totalprice: ['', Validators.required],
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.invoiceForm.controls; }

  printComponent(cmpName: any) {
    let printContents = document.getElementById(cmpName).innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  }

  onblurCustomerMobile(value: any) {
    this.getCustomer(value);
  }

  onupdateQuantity(value: number) {
    this.invoiceForm.patchValue({
      totalprice: Number(this.f.price.value) * Number(value)
    });
  }

  private getCustomer(id: any) {
    this.customerService.getbyMobile(id).subscribe(item => {
      this.customerValue = item.data;
      if (item.error || item.message) {
        this.invoiceForm.patchValue({
          userGroup: {
            customermobile: this.f.userGroup.value.customermobile,
            customername: "",
            customeraddress: "",
            customeremail: "",
          },
        });
        return false;
      }
      this.invoiceForm.patchValue({
        userGroup: {
          customermobile: this.customerValue.mobile,
          customername: this.customerValue.customername,
          customeraddress: this.customerValue.address,
          customeremail: this.customerValue.emailid,
        },
      });
    },
      (error: any) => {
        this.alertService.error(error);
        console.log(error);
      }
    );
  }

  numberOnly(event: any): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

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

  onProductNameChange(value: any) {
    if (value == 0) {
      return false;
    }
    this.productService.get(value).subscribe(item => {
      this.productvalue = item.data;
      debugger;
      this.invoiceForm.patchValue({
        unitofmeasure: Number(this.productvalue.unitofmeasure),
        quantity: this.productvalue.quantity,
        price: this.productvalue.price1,
        totalprice: Number(this.productvalue.price1) * Number(this.productvalue.quantity)
      });
    },
      (error: any) => {
        this.alertService.error(error);
        console.log(error);
      }
    );

  }

  onSubmit() {
    this.submitted = true;
    this.alertService.clear();
    debugger;
    if (this.invoiceForm.invalid) {
      debugger;
      return;
    }
  }

}