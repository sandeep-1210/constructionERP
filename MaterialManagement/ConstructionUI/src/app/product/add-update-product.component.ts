import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/_services/authentication.service';
import { User } from 'src/_models/user';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AlertService } from 'src/_services/alert.service';
import { ProductService } from 'src/_services/product.service';
import { CategoryService } from 'src/_services/category.service';
import { SupplierService } from 'src/_services/supplier.service';
import { BrandService } from 'src/_services/brand.service';

@Component({
  selector: 'app-add-update-product',
  templateUrl: './add-update-product.component.html',
  styleUrls: ['./add-update-product.component.css']
})
export class AddUpdateProductComponent implements OnInit {

  currentUser: User;
  productForm: FormGroup;
  productValue: any;
  loading = false;
  submitted = false;
  returnUrl: string;
  result = false;
  responseMessage: string;
  productLabel = "Add Category";
  productbtn = "Add";
  paramId: string;
  categorylist: any[] = [];
  supplierlist: any[] = [];
  brandlist: any[] = [];
  unitofmeasuresubmitted = false;
  categorynamesubmitted = false;
  suppliernamesubmitted = false;
  showHideBrand = true;
  weight = "Weight";
  totalweightInKg: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private productService: ProductService,
    private alertService: AlertService,
    private categoryService: CategoryService,
    private supplierService: SupplierService,
    private brandService: BrandService
  ) {
    this.currentUser = this.authenticationService.currentUserValue;
    this._getAllCategory();
    this._getAllSupplier();
    this._getAllBrands();
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      console.log(params['id']) //log the value of id
      this.paramId = params['id'];
      this.getProduct(params['id']);
    });

    this.productForm = this.formBuilder.group({
      productname: ['', Validators.required],
      categoryname: ['select', Validators.required],
      unitofmeasure: [0, Validators.required],
      productsize: [0, Validators.required],
      price1: ['', Validators.required],
      price2: [],
      price3: [],
      purchaseprice: ['', Validators.required],
      brandName: ['0', Validators.required],
      quantity: ['', Validators.required],
      suppliername: [0, Validators.required]
    });

    // get return url from route parameters or default to '/'
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dashboard';
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

  private getProduct(id: any) {
    if (id == 0) {
      this.productLabel = "Add Product";
      this.productbtn = "Add";
      // Resetting the form, resets any previous validation errors
      if (this.productForm) this.productForm.reset();

    } else {
      this.productService.get(id).subscribe(item => {
        this.productValue = item.data;
        if (item.error || item.message) {
          const message = item.error ? item.error.message : item.message;
          alert(message + "  :-  " + id);
          this.router.navigate(['/edit/0']);
        }
        console.log(this.productValue);

        this.productLabel = "Update Category";
        this.productbtn = "Update";
        this.productForm.setValue({
          productname: this.productValue.productname,
          categoryname: this.productValue.categoryname,
          unitofmeasure: this.productValue.unitofmeasure,
          productsize: this.productValue.productsize,
          price1: this.productValue.price1,
          price2: this.productValue.price2,
          price3: this.productValue.price3,
          purchaseprice: this.productValue.purchaseprice,
          brandName: this.productValue.brandName,
          quantity: this.productValue.quantity,
          suppliername: this.productValue.suppliername,

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
  get f() { return this.productForm.controls; }

  onSubmit() {
    this.submitted = true;

    // for (let controller in this.productForm.controls) {
    //   this.productForm.get(controller).markAsTouched();
    // }

    // if (this.productForm.valid) {
    //   console.log('Ok')
    // } else {
    //   console.log('No')
    // }

    // reset alerts on submit
    this.alertService.clear();

    // stop here if form is invalid
    if (this.productForm.invalid) {
      return;
    }
    if (this.productForm.controls.categoryname.value == 'select') {
      this.categorynamesubmitted = true;
      return;
    }
    if (this.productForm.controls.unitofmeasure.value == 0) {
      this.unitofmeasuresubmitted = true;
      return;
    }
    if (this.productForm.controls.suppliername.value == 0) {
      this.suppliernamesubmitted = true;
      return;
    }
    if (this.f.unitofmeasure.value == 1) {
      this.totalweightInKg = Number(this.f.quantity.value) / 1000
    }
    if (this.f.unitofmeasure.value == 2) {
      this.totalweightInKg = Number(this.f.quantity.value)
    }
    if (this.f.unitofmeasure.value == 3) {
      this.totalweightInKg = Number(this.f.quantity.value) * 100
    }
    if (this.f.unitofmeasure.value == 4) {
      this.totalweightInKg = Number(this.f.quantity.value) * 1000
    }


    var obj = {
      "productname": this.f.productname.value,
      "categoryname": this.f.categoryname.value,
      "unitofmeasure": this.f.unitofmeasure.value,
      "productsize": this.f.productsize.value,
      "price1": this.f.price1.value,
      "price2": this.f.price2.value,
      "price3": this.f.price3.value,
      "purchaseprice": this.f.purchaseprice.value,
      "brandName": this.f.brandName.value,
      "quantity": this.f.quantity.value,
      "suppliername": this.f.suppliername.value,
      "totalweightinkg": this.totalweightInKg,
    }

    this.loading = true;
    if (this.productbtn == "Add") {
      this.productService.save(obj).subscribe(
        (data) => {
          if (data) {
            this.loading = false;
            if (data.error) {
              debugger;
              alert(data.error.errorText);
              if (data.error.message.includes("Product already exists")) {
                this.router.navigate(['/productList']);
              }
              return null;
            }
            this.responseMessage = data.message;
            this.result = true;
            this.alertService.success(data.message);
            alert(data.message);
            this.productForm.reset();
            this.router.navigate(['/productList']);
          }
          else {

            this.alertService.error(data);
            this.loading = false;
          }
        },
        (error: any) => {
          debugger;
          this.alertService.error(error);
          this.loading = false;
          console.log(error);
        }
      );
    }
    else {
      // Update Category     
      this.productService.update(obj, this.paramId).subscribe(
        (data) => {
          if (data) {
            this.loading = false;
            this.productForm.reset();
            this.responseMessage = data.message;
            this.result = true;
            this.alertService.success(data.message);
            this.router.navigate(['/productList']);
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

  onChange(value: string) {
    this.showHideBrand = true;
    if (value.toLowerCase().includes("sand") || value.toLowerCase().includes("stone")) {
      this.showHideBrand = false;
    }
  }
  onChangeUnit(event: Event) {

    let selectElementText = event.target['options']
    [event.target['options'].selectedIndex].text;
    console.log(selectElementText);
    this.weight = "Weight in " + selectElementText;
    if (selectElementText.toLowerCase().includes("packet")) {
      this.weight = "Number of " + selectElementText;
    }

  }
}

