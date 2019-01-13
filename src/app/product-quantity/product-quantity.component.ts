import {Component, Input, OnInit} from '@angular/core';
import {ProductDetail} from '../models/product-detail';
import {ShoppingCartService} from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product: ProductDetail;
  @Input('shopping-cart')  shoppingCart;
  @Input('product-index')  productIndex;
  constructor(private cartService: ShoppingCartService) {}

  addToCart() {
    console.log(this.product);
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }



}
