import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly productURL: string ;


  constructor(private http: HttpClient) {
    this.productURL = 'http://192.168.1.152:8080/products';
  }

  public findProductById(id: number) :Observable<Product> {
    return this.http.get<Product>(this.productURL + "/" + id);
  }

  public findAll() :Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL + '/all');
  }

  public findAllByType(productType: string) :Observable<Product[]> {
    return this.http.get<Product[]>(this.productURL + "/" + productType + "/" + '/all');
  }

  public saveNewProduct (product: Product) {
    return this.http.post<Product>(this.productURL, product);
  }

  public updateProduct(product: Product) {
    let endPoint = this.productURL + "/" + product.id;
    return this.http.put<Product>(endPoint, product).subscribe( data => console.log("Product{} updated successfully", data.id));
  }

}
