import {AfterContentInit, AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {Product} from "../../models/product";
import {ProductService} from "../../services/product.service";
import {MatSort, Sort} from "@angular/material/sort";
import {LiveAnnouncer} from "@angular/cdk/a11y";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit, AfterViewInit {
  allProducts!: MatTableDataSource<Product>;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;
  tempProducts!: Product[];
  displayedColumns: string[] = ['id', 'name', 'productType'];

  constructor(private productService: ProductService, private _liveAnnouncer: LiveAnnouncer) { }

  convertToTitleCase(str: string) {
    return str.toLowerCase().split(' ').map(function(word) {
      return word.replace(word[0], word[0].toUpperCase());
    }).join(' ');
  }

  ngOnInit(): void {
    this.productService.findAll().subscribe(data => {
      this.tempProducts = data;
      this.tempProducts.forEach(product => {
        product.productType = this.convertToTitleCase(product.productType);
      })
      this.allProducts = new MatTableDataSource(this.tempProducts);
      this.allProducts.sort = this.sort;
      this.allProducts.paginator = this.paginator;
    });
  }

  ngAfterViewInit() {};


  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`)
        .then(r => console.log(r));
    } else {
      this._liveAnnouncer.announce('Sorting cleared').then(r => console.log(r));
    }
  }

}
