import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component'
import { LoginComponent } from './login/login.component'
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from '../_helpers/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MainComponent } from './main/main.component'
import { CategoryComponent } from './category/category.component';
import { AddCategoryComponent } from './category/add-category.component';
import { ProductListComponent } from './product/product-list.component';
import { AddUpdateProductComponent } from './product/add-update-product.component';
import { AddSupplierComponent } from './supplier/add-supplier.component';
import { SupplierListComponent } from './supplier/supplier-list.component';
import { AddUpdateBrandComponent } from './brand/add-update-brand.component';
import { BrandListComponent } from './brand/brand-list.component';
import { BuildInvoiceComponent } from './invoice/build-invoice.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'main', component: MainComponent },
  { path: 'categoryList', component: CategoryComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: AddCategoryComponent, canActivate: [AuthGuard] },
  { path: 'productList', component: ProductListComponent, canActivate: [AuthGuard] },
  { path: 'editProduct/:id', component: AddUpdateProductComponent, canActivate: [AuthGuard] },
  { path: 'editSupplier/:id', component: AddSupplierComponent, canActivate: [AuthGuard] },
  { path: 'addSupplier/:id', component: AddSupplierComponent, canActivate: [AuthGuard] },
  { path: 'supplierList', component: SupplierListComponent, canActivate: [AuthGuard] },
  { path: 'editBrand/:id', component: AddUpdateBrandComponent, canActivate: [AuthGuard] },
  { path: 'addBrand/:id', component: AddUpdateBrandComponent, canActivate: [AuthGuard] },
  { path: 'brandList', component: BrandListComponent, canActivate: [AuthGuard] },
  { path: 'buildInvoice', component: BuildInvoiceComponent, canActivate: [AuthGuard] },
  
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
