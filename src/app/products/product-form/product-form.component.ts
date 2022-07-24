import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ProductService} from "../../services/product.service";
import {first} from "rxjs";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  id: string | null = "" ;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  productAttributes!:Map<string,string>[];

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
      id: [''],
      name: ['', Validators.required],
      productType: ['', Validators.required],
      attributes: new FormArray([]),
      images: new FormArray([]),
      prices: new FormArray([])
    });

    if (!this.isAddMode) {
      let idForSearch: string = this.id as string;
      this.productService.findProductById(idForSearch).pipe(first())
        .subscribe(product => {
          this.productForm.patchValue(product);
          this.productAttributes = product.attributes;});

    }
  }

  get f() { return this.productForm.controls; }

  onSubmit(){
    this.submitted = true;
    this.loading = true;
    if (this.productForm.invalid) {
      return;
    }
    if (this.isAddMode) {
      this.productService.saveNewProduct(this.productForm.value)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/products/products-list']);
        });
    } else {
      this.productService.updateProduct(this.productForm.value, this.id as string)
        .subscribe(() => {
          this.loading = false;
          this.router.navigate(['/products']).then(r => console.log(r));
        });
    }
  }

  createProduct(){
    this.productService.saveNewProduct(this.productForm.value)
      .pipe(first())
      .subscribe( {
        next: () => {
          this.loading = false;
          this.router.navigate(['/products/productList']);
        }
      })
  }

  updateProduct(){
    this.productService.updateProduct(this.productForm.value, this.id as string)
      .pipe(first())
      .subscribe( {
        next: () => {
          this.loading = false;
          this.router.navigate(['/products/productList']).then(r => console.log(r));
        }
      })
  }
}
