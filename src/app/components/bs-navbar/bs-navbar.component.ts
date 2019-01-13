import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth.service';
import {AppUser} from '../../models/app-user';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {ShoppingCartService} from '../../shopping-cart.service';
import {Observable} from 'rxjs';
import {ShoppingCart} from '../../models/shopping-cart';


@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  appUser: AppUser;
  cart$: Observable<ShoppingCart>;
  constructor(private auth: AuthService,
              private router: Router,
              private afAuth: AngularFireAuth,
              private cartService: ShoppingCartService) {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  async ngOnInit() {
    this.auth.appUser$.subscribe(appUser =>{
      this.appUser = appUser;
    });
    this.cart$ = await this.cartService.getCart();
  }

}
