import { Component, OnInit } from '@angular/core';
import {SportPoolService} from "../../service/sport-pool.service";
import {ProgressPoolMatch} from "../../model/progress-pool-match";
import Swal from "sweetalert2";
import {Response} from "../../model/response";
import {Route, Router} from "@angular/router";

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

  constructor(private sportPoolService:SportPoolService,private router:Router) { }

  ngOnInit(): void {
    this.getSportPool();
  }


   getSportPool() {
     this.id = sessionStorage.getItem("user");
     this.sportPoolService.getAllSportPoolByUser(this.id).subscribe(
       res=>{
         console.log(res)
         this.progressPoolList = res;
       },error => {
         this.loading = false;
         this.response = error.error;
         Swal.fire({
           title: this.response.message,
           icon: 'error',
           showConfirmButton: true,
           allowOutsideClick: false,
           allowEscapeKey: false
         })
       }
     );
  }

  routeJoin(pool:ProgressPoolMatch) {
    this.router.navigate(['joinpool',pool.id])
  }

  routeNewMatch() {
    this.router.navigate(['newmatch'])
  }
}
