import { Component, Input } from '@angular/core';
import {ProductDetail} from '../models/product-detail';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product: ProductDetail;
  @Input('show-actions') showActions = true;
  constructor() {}
}
