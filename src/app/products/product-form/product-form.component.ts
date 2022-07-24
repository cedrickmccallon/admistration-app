import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {first} from "rxjs";
import {Product} from "../../models/product";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  id: string | null = "";
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  productAttributes!: Map<string, string>;
  productPrices!: Map<string, number>
  productImages!: Map<string, string>;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService
  ) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.isAddMode = !this.id;

    this.productForm = this.formBuilder.group({
      id: [{value: '', disabled: true}],
      name: ['', Validators.required],
      productType: ['', Validators.required],
      attributes: this.formBuilder.array([]),
      images: this.formBuilder.array([]),
      prices: this.formBuilder.array([])
    });

    if (!this.isAddMode) {
      let idForSearch: string = this.id as string;
      this.productService.findProductById(idForSearch).pipe(first())
        .subscribe(product => {
          this.productForm.patchValue({
            id: product.id,
            name: product.name,
            productType: product.productType
          });
          this.productAttributes = product.attributes;
          this.productImages = product.images;
          this.productPrices = product.prices
        });
    } else{
      this.productAttributes = new Map<string, string>();
      this.productAttributes.set("Default", "Default");
      this.productImages = new Map<string, string>();
      this.productImages.set("Default", "Default");
      this.productPrices = new Map<string, number>();
      this.productPrices.set("Default", 0.00);
    }
  }

  get f() {
    return this.productForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    if (this.productForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      let newProduct: Product = new Product();
      newProduct.id = this.productForm.get("id")?.value;
      newProduct.name = this.productForm.get("name")?.value;
      newProduct.productType = this.productForm.get("productType")?.value;
      newProduct.attributes = this.productAttributes;
      newProduct.images = this.productImages;
      newProduct.prices = this.productPrices;

      this.productService.saveNewProduct(this.productForm.value)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/products/products-list']);
        });
    } else {
      let updatedProduct: Product = new Product();
      updatedProduct.id = this.productForm.get("id")?.value;
      updatedProduct.name = this.productForm.get("name")?.value;
      updatedProduct.productType = this.productForm.get("productType")?.value;
      updatedProduct.attributes = this.productAttributes;
      updatedProduct.images = this.productImages;
      updatedProduct.prices = this.productPrices;

      this.productService.updateProduct(updatedProduct, this.id as string)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/products']).then(r => console.log(r));
        });
    }
  }

  createProduct() {
    this.productService.saveNewProduct(this.productForm.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products/productList']).then(r => console.log(r));
        }
      })
  }

  updateProduct() {
    this.productService.updateProduct(this.productForm.value, this.id as string)
      .pipe(first())
      .subscribe({
        next: () => {
          this.loading = false;
          this.router.navigate(['/products/productList']).then(r => console.log(r));
        }
      })
  }
}
