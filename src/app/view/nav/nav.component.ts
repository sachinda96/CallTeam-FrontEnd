import { Component, OnInit } from '@angular/core';
import {interval} from "rxjs";

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

    interval(10*100)
      .subscribe(() => {
        let id = sessionStorage.getItem("user");
        if(id ==null){
            this.isLogin = false;
        }else{
          this.isLogin = true;
        }
      });

  }


  logout() {
    sessionStorage.clear();
  }
}
