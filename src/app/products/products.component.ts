import { Component, OnInit } from '@angular/core';
import {RouteInfo} from "../sidebar/sidebar.component";


export const PRODUCTS_ROUTES : RouteInfo[] = [
  { path:'/products/productList',
    title:'Product List',
    type:'link',
    iconType:'nc-icon nc-book-bookmark'}
]

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  public menuItems: any[];

  isNotMobileMenu() {
    return window.outerWidth <= 991;
  }

  constructor() {
    this.menuItems = PRODUCTS_ROUTES.filter(menuItem => menuItem);
  }

  ngOnInit(): void {
  }

}
