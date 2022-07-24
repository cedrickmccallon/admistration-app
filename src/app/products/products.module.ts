import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { ProductsRoutingModule } from './products-routing.module';
import {PRODUCTS_ROUTES, ProductsComponent} from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductService} from "../services/product.service";
import { ProductFormComponent } from './product-form/product-form.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent,
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    MatTableModule,
    MatSortModule,
    ReactiveFormsModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }
