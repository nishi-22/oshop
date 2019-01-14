import { Component, OnInit } from '@angular/core';
import {OrderService} from '../../services/order/order.service';
import {switchMap} from 'rxjs/operators';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
orders$;
constructor(private authService: AuthService,
              private orderService: OrderService) {
  this.orders$ = authService.user$.pipe(switchMap( user => orderService.getOrdersByUser(user.uid)));
}

  ngOnInit() {
  }
}
