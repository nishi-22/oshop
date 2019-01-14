import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { DataTableModule } from 'angular-6-datatable';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import { BsNavbarComponent } from './components/bs-navbar/bs-navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { OrderSuccessComponent } from './components/order-success/order-success.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { AdminProductsComponent } from './components/admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './components/admin/admin-orders/admin-orders.component';
import { LoginComponent } from './components/login/login.component';
import {AuthGuardService} from './services/auth-guard/auth-guard.service';
import {UsersService} from './services/user/users.service';
import { ProductFormComponent } from './components/admin/product-form/product-form.component';
import {ProductService} from './services/product/product.service';
import { ProductFilterComponent } from './components/products/product-filter/product-filter.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import {ShoppingCartService} from './services/shopping-cart/shopping-cart.service';
import { ProductQuantityComponent } from './components/product-quantity/product-quantity.component';
import {OrderService} from './services/order/order.service';
import { ShoppingCartSummaryComponent } from './components/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './components/shipping-form/shipping-form.component';
import {AdminAuthGuardService} from './services/admin-authGuard/admin-auth-guard.service';
import {AuthService} from './services/auth/auth.service';
import {CategoryService} from './services/category/category.service';

const routes = [
   { path: '', component: ProductsComponent },
   { path: 'products', component: ProductsComponent },
   { path: 'shopping-cart', component: ShoppingCartComponent },
   { path: 'login', component: LoginComponent },
   { path: 'check-out', component: CheckOutComponent , canActivate: [AuthGuardService] },
   { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [AuthGuardService]  },
   { path: 'my-orders', component: MyOrdersComponent , canActivate: [AuthGuardService]},
   { path: 'admin/products/new', component: ProductFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
   { path: 'admin/products/:id', component: ProductFormComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
   { path: 'admin/products', component: AdminProductsComponent , canActivate: [AuthGuardService, AdminAuthGuardService]},
   { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [AuthGuardService, AdminAuthGuardService] }
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
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes),
    NgbModule,
    FormsModule,
    CustomFormsModule,
    DataTableModule
  ],
  providers: [AuthService, AuthGuardService, UsersService , AdminAuthGuardService, CategoryService, ProductService, ShoppingCartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
