import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products.component';
import {ProductListComponent} from "./product-list/product-list.component";
import {ProductFormComponent} from "./product-form/product-form.component";

const routes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'productList', component:ProductListComponent },
  { path: 'productForm', component:ProductFormComponent },
  { path: 'add', component:ProductFormComponent },
  { path: 'edit/:id', component:ProductFormComponent }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
