import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../../services/product/product.service';
import {ActivatedRoute} from '@angular/router';
import {ProductDetail} from '../../models/product-detail';
import {ShoppingCartService} from '../../services/shopping-cart/shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
    products: ProductDetail[];
    filteredProducts: ProductDetail[];
    category: string;
    cart$: Observable<ShoppingCart>;
   constructor(private productService: ProductService,
                    private route: ActivatedRoute,
                    private cartService: ShoppingCartService) {
  }
  async ngOnInit() {
      this.cart$ = await this.cartService.getCart();
      this.populateProduct();
  }
  private populateProduct() {



    this.productService.getAll()
      .subscribe(products => {
        this.products = products;
        this.route.queryParamMap
          .subscribe(params => {
            this.category = params.get('category');
            this.applyFilter();
          });
      });
  }
  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter(p => p.category === this.category) : this.products;
  }
}
