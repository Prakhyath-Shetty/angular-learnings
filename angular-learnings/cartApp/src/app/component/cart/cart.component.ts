import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public products: any = [];
  public quantity!: any;
  public grandTotal!: number;
  public totalPrice!: number;
  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  removeItem(item: any) {
    this.cartService.removeCartItem(item);
  }
  emptycart() {
    this.cartService.removeAllCart();
  }
  onAdd(item: any) {
    item.quantity = item.quantity + 1;
    // this.quantity= item.quantity
  }

  onMinus(item: any) {
    if (item.quantity >1 ) {
      item.quantity = item.quantity - 1;
      // this.quantity = item.quantity
    }
    else{
      if(item.quantity<=1){
        this.removeItem(item)
      }
    }
  }

  priceChange() {
    console.log(this.cartService.getTotalPrice());
    this.grandTotal = this.cartService.getTotalPrice();
  }

  // shopMore(){



  //   localStorage.setItem("Quantity", this.quantity);
  //   console.log(this.quantity);
    
  //   this.router.navigateByUrl("/products");

  // }
}
