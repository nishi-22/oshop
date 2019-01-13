import {Component, Input, OnInit} from '@angular/core';
import {Order} from '../components/check-out/order';
import {OrderService} from '../order.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';
import {ShoppingCart} from '../models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit {
  @Input('cart') cart: ShoppingCart;
  shipping = {};
   userId: string;

  constructor(private orderService: OrderService,
              private authService: AuthService,
              private router: Router) {

  }

  ngOnInit() {
    this.authService.user$.subscribe( user => this.userId = user.uid);
  }
  async placeOrder() {
    const order = new Order(this.userId, this.shipping, this.cart);
    const result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.key]);
  }
}
