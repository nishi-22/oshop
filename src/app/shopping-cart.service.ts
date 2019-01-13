import { Injectable } from '@angular/core';
import {AngularFireDatabase, FirebaseObjectObservable} from 'angularfire2/database';
import {ProductDetail} from './models/product-detail';
import { take, map } from 'rxjs/operators';
import {ShoppingCart} from './models/shopping-cart';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private quantity: number;

  constructor(private db: AngularFireDatabase) { }

  private create() {
    return this.db.list('/shopping-cart').push({
      dateCreated: new Date().getTime()
    });
  }


  async getCart(): Promise<Observable<ShoppingCart>> {
    const cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/' + cartId)
      .pipe(map(x => {
          return new ShoppingCart(x.items);
        })
      );
  }

  private getItem(cartId, productId: string): FirebaseObjectObservable<any> {
    return this.db.object('/shopping-cart/' + cartId + '/items/' + productId);
  }
  private async getOrCreateCartId(): Promise<string> {
    const cartId = localStorage.getItem('cartId');
    if (cartId) { return cartId; }
    const result = await this.create();
    localStorage.setItem('cartId', result.key);
    return result.key;

  }

  async addToCart(product: ProductDetail) {
    this.updateItem(product, 1);
  }
  async removeFromCart(product: ProductDetail) {
    this.updateItem(product, -1);
  }
  private async updateItem(product: ProductDetail, change: number) {
    console.log(product);
    const cartId =  await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.pipe(take(1)).subscribe(
      item => {
        item$.update({
          title: product.title,
          imageUrl: product.imageUrl,
          price: product.price,
          quantity: (item.quantity || 0) + change});
      });
  }

}
