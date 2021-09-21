import { Component, OnInit } from '@angular/core';
import {OwlOptions} from "ngx-owl-carousel-o";
import {ProgressPoolMatch} from "../../model/progress-pool-match";
import {SportPoolService} from "../../service/sport-pool.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
  ''
  ]
})
export class HomeComponent implements OnInit {

  progressPoolList: Array<ProgressPoolMatch> = new Array<ProgressPoolMatch>();
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  id: any;

  constructor(private sportPoolService:SportPoolService,private router:Router) { }

  ngOnInit(): void {
    this.getSportPool();
  }


  getSportPool() {
    this.id = sessionStorage.getItem("user");
    this.sportPoolService.getAllSportPoolByUser(this.id).subscribe(
      res=>{
        this.progressPoolList = res;
      }

    );
  }

  naviGateMatchPool() {
    this.router.navigate(['matchpool'])
  }
}
