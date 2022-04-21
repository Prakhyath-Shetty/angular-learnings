import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  email_Id:any;
  password:any;
  mobile:any; 

  constructor() { }

  ngOnInit(): void {
    console.log(this.email_Id);
  }

}
