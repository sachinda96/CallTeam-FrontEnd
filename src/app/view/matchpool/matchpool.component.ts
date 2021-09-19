import { Component, OnInit } from '@angular/core';
import {SportPoolService} from "../../service/sport-pool.service";
import {ProgressPoolMatch} from "../../model/progress-pool-match";
import {Response} from "../../model/response";
import {Router} from "@angular/router";
import {OwlOptions} from "ngx-owl-carousel-o";
import {SportService} from "../../service/sport.service";
import {Sport} from "../../model/sport";
import {PlayGroundService} from "../../service/play-ground.service";
import {PlayGround} from "../../model/play-ground";

@Component({
  selector: 'app-matchpool',
  templateUrl: './matchpool.component.html',
  styleUrls: ['./matchpool.component.css']
})
export class MatchpoolComponent implements OnInit {

  id: any;
  progressPoolList: Array<ProgressPoolMatch> = new Array<ProgressPoolMatch>();
  loading: boolean = false;
  response: Response = new Response();
  sportList:Array<Sport> = new Array<Sport>();
  playGroundList:Array<PlayGround> = new Array<PlayGround>();

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

  constructor(private sportPoolService:SportPoolService,private router:Router,private sportService:SportService,private playGroundService:PlayGroundService) { }

  ngOnInit(): void {
    this.getSportPool();
    this.getAllSport();
    this.getAllPlayGround();
  }


   getSportPool() {
     this.id = sessionStorage.getItem("user");
     this.sportPoolService.getAllSportPoolByUser(this.id).subscribe(
       res=>{
         this.progressPoolList = res;
       },error => {
         this.loading = false;
         this.response = error.error;
         // Swal.fire({
         //   title: this.response.message,
         //   icon: 'error',
         //   showConfirmButton: true,
         //   allowOutsideClick: false,
         //   allowEscapeKey: false
         // })
       }
     );
  }

  routeJoin(pool:ProgressPoolMatch) {
    this.router.navigate(['joinpool',pool.id])
  }

  routeNewMatch() {
    this.router.navigate(['newmatch'])
  }

  getAllSport() {
    this.sportService.getAll().subscribe(
      res=>{
        this.sportList = res;
      }
    );
  }

  getAllPlayGround() {
    this.playGroundService.getAll().subscribe(
      res=>{
        this.playGroundList = res;
      }
    );
  }
}
