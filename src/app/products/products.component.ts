import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProductService} from '../product.service';
import {ActivatedRoute} from '@angular/router';
import {ProductDetail} from '../models/product-detail';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products: ProductDetail[];
filteredProducts: ProductDetail[];
category: string;
cart: any;
   constructor(private productService: ProductService,
                    private route: ActivatedRoute,
                    private cartService: ShoppingCartService) {
     productService.getAll().subscribe(products => {
      this.products = products;
      route.queryParamMap.subscribe(params => {
        this.category = params.get('category');
        this.filteredProducts = (this.category) ?
          this.products.filter(p => p.category === this.category) : this.products;
      });
    });
  }
  async ngOnInit() {
    (await this.cartService.getCart())
      .subscribe( cart => this.cart = cart);
  }
}
