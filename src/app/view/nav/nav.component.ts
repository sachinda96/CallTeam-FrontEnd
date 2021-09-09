import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogin: boolean = false;

  constructor() { }

  ngOnInit(): void {
    if(sessionStorage.getItem("token")){
      this.isLogin = true;
    }else {
      this.isLogin = false;
    }


  }


  logout() {

  }
}
