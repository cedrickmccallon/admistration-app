import { Component, OnInit } from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  allProducts!: Product[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.findAll().subscribe(data => {
      this.allProducts = data;
    });
  }

}
