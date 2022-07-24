import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';

import { ProductsRoutingModule } from './products-routing.module';
import {PRODUCTS_ROUTES, ProductsComponent} from './products.component';
import { ProductListComponent } from './product-list/product-list.component';
import {ProductService} from "../services/product.service";


@NgModule({
  declarations: [
    ProductsComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule
  ],
  providers: [ProductService]
})
export class ProductsModule { }
