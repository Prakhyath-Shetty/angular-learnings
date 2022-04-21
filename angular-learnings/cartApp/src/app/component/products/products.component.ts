import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  //storing all the product from the api inside productlist
  buttonDisabled: boolean = false;
  public productList: any;
  public filterCategory: any[] = [];
  public cartItemIdList: number[] = [];
  searchKey: string = '';
  products: any[] = [];

  constructor(
    private api: ApiService,
    private cartService: CartService,
    private wishListService: WishlistService
  ) {
    this.bindCartItems();
  }

  bindCartItems(): void {
    this.cartItemIdList = this.cartService.cartItemList.map(
      (item: any) => item.id
    );
  }

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.bindCartItemsToProducts();
    });
  }

  bindCartItemsToProducts(): void {
    this.productList = this.productList.map((a: any) => {
      if (
        a.category === "women's clothing" ||
        a.category === "men's clothing"
      ) {
        a.category = 'fashion';
      }

      let cartItem = this.cartService.cartItemList.find(
        (item: any) => item.id == a.id
      );
      a.quantity = cartItem ? cartItem.quantity : 1;
      a.total = a.price;
      return a;
    });
  }

  ngAfterViewInit() {
    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
    this.cartService.getProducts().subscribe((res) => {
      this.products = res;
      console.log(this.products[0].quantity, 'Works');
      // this.grandTotal = this.cartService.getTotalPrice();
    });
  }

  addtoCart(item: any) {
    if (
      this.cartService.cartItemList &&
      this.cartService.cartItemList.findIndex(
        (prod: any) => prod.id === item.id
      ) >= 0
    ) {
      alert('This product is already present in the cart!');
    } else {
      this.cartService.addtoCart(item);
      this.bindCartItems();
    }
  }

  filter(category: string) {
    this.filterCategory = this.productList.filter(
      (a: any) => a.category == category || category == ''
    );
  }

  OnWishList(item: any) {
    this.wishListService.wishlistCart(item);
  }

  onAdd(item: any) {
    this.cartService.onAdd(item);
    this.bindCartItems();
    this.bindCartItemsToProducts();
  }

  onMinus(item: any) {
    this.cartService.onMinus(item);
    this.bindCartItems();
    this.bindCartItemsToProducts();
  }

  sortProductByPrice(option: any) {
    if (option.value == 'l2h') {
      this.filterCategory = this.productList.sort(
        (a: any, b: any) => a.price - b.price
      );
    } else if (option.value == 'h2l') {
      this.filterCategory = this.productList.sort(
        (a: any, b: any) => b.price - a.price
      );
    } else if (option.value == 'ol') {
      this.filterCategory = this.productList.filter(
        (a: any) => a.price >= 0 && a.price <= 100
      );
    } else if (option.value == 'br') {
      this.filterCategory = this.productList.filter(
        (a: any) => a.price > 100 && a.price <= 400
      );
    } else {
      this.filterCategory = this.productList.filter((a: any) => a.price > 400);
    }
  }
}
