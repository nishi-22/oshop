import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { BsNavbarComponent } from './bs-navbar/bs-navbar.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import {AuthService} from './auth.service';
import {AuthGuardService} from './auth-guard.service';
 const routes = [
   { path: '', component: HomeComponent },
   { path: 'products ', component: ProductsComponent },
   { path: 'shopping-cart', component: ShoppingCartComponent },
   { path: 'login', component: LoginComponent },
   { path: 'check-out', component: CheckOutComponent , canActivate: [AuthGuardService] },
   { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuardService]  },
   { path: 'my-orders', component: MyOrdersComponent , canActivate: [AuthGuardService]},
   { path: 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuardService]},
   { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService] }
 ];
@NgModule({
  declarations: [
    AppComponent,
    BsNavbarComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgbModule
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
