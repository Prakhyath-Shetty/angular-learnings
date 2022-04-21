import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { WishlistService } from 'src/app/service/wishlist.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
 
  public totalItem : number = 0;
  public wishItem:number =0;
  public searchTerm !: string;
  constructor(private cartService : CartService, private wishlistService: WishlistService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res=>{
      this.totalItem = res.length;
    })
    this.wishlistService.getProducts()
    .subscribe(res=>{
      this.wishItem = res.length;
    })
  }
  search(event:any){
    this.searchTerm = (event.target as HTMLInputElement).value;
    console.log(this.searchTerm);
    this.cartService.search.next(this.searchTerm);
  }

}
