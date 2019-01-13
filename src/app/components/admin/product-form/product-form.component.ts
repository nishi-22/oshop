import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../category.service';
import {ProductService} from '../../../product.service';
import {ActivatedRoute, Router} from '@angular/router';
import 'rxjs/add/operator/take';
import {ProductDetail} from '../../../models/product-detail';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  id;
  categories$;
  product: ProductDetail = new ProductDetail();
  constructor(categoryService: CategoryService, private  productService: ProductService,
              private router: Router,
              private route: ActivatedRoute ) {
    this.categories$ = categoryService.getCategories();
     this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
          this.productService.getProduct(this.id).subscribe((p: ProductDetail) => {
            this.product = p;
          });
        }
  }

  save(product) {
    if (this.id) {
      this.productService.update(this.id, product);
    } else {
      this.productService.create(product);
    }
    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete this product')){
        this.productService.delete(this.id);
        this.router.navigate(['/admin/products']);
    }
  }

  ngOnInit() {
  }

}
