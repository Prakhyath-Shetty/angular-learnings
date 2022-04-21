import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  email: string = '';
  constructor() {}

  ngOnInit(): void {}

  onNotify() {
    if (!this.email) {
      alert('Please enter the email address');
    }
  }
}
