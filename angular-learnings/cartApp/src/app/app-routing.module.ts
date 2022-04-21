import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './component/cart/cart.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { EmailjsComponent } from './component/emailjs/emailjs.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { LoginComponent } from './component/login/login.component';
import { ProductsComponent } from './component/products/products.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { WishListComponent } from './component/wish-list/wish-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wish-list', component: WishListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'invoice', component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
