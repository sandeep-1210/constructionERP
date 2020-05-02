import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

// used to create fake backend
// import { fakeBackendProvider } from '../_helpers/fake-backend';
import { JwtInterceptor } from '../_helpers/jwt.interceptor';
import { ErrorInterceptor } from '../_helpers/error.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CategoryComponent } from './category/category.component';
import { AgGridModule } from 'ag-grid-angular';
import { DataTableModule } from "angular-6-datatable";

import { FormsModule } from '@angular/forms';
import { SearchPipe } from './search.pipe';
import { AddCategoryComponent } from './category/add-category.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ProductListComponent } from './product/product-list.component';
import { AddUpdateProductComponent } from './product/add-update-product.component';
import { AddSupplierComponent } from './supplier/add-supplier.component';
import { SupplierListComponent } from './supplier/supplier-list.component';
import { AddUpdateBrandComponent } from './brand/add-update-brand.component';
import { BrandListComponent } from './brand/brand-list.component';
import { BuildInvoiceComponent } from './invoice/build-invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    RegisterComponent,
    DashboardComponent,
    MainComponent,
    HeaderComponent,
    SidebarComponent,
    CategoryComponent,
    SearchPipe,
    AddCategoryComponent,
    ProductListComponent,
    AddUpdateProductComponent,
    AddSupplierComponent,
    SupplierListComponent,
    AddUpdateBrandComponent,
    BrandListComponent,
    BuildInvoiceComponent
  ],
  imports: [
    BrowserModule,
    AgGridModule.withComponents([]),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTableModule,
    FormsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger' // set defaults here
    })
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    //fakeBackendProvider
  ],
  entryComponents: [LoginComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
