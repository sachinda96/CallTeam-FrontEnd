import { Component, OnInit } from '@angular/core';
import {SportPool} from "../../model/sport-pool";
import {SportPoolService} from "../../service/sport-pool.service";
import {Reservation} from "../../model/reservation";
import {ActivatedRoute} from "@angular/router";
import {SportPoolDetails} from "../../model/sport-pool-details";
import {interval, Observable} from "rxjs";
import {UserDetails} from "../../model/user-details";
import {UserService} from "../../service/user.service";

@Component({
  selector: 'app-joinpool',
  templateUrl: './joinpool.component.html',
  styleUrls: ['./joinpool.component.css']
})
export class JoinpoolComponent implements OnInit {
  reservation: Reservation = new Reservation();
  sportPoolDetails : SportPoolDetails = new SportPoolDetails();
  team1: any;
  team2: any;
  userDetails:UserDetails = new UserDetails();
  id: any = "";

  constructor(private sportPoolService:SportPoolService,private routerActive: ActivatedRoute,private userService:UserService) { }

  ngOnInit(): void {

    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.getPoolMatch(params.id);
      }
    });

    this.getUser();

  }

  join(poolId:any,teamId:string,index:number) {
    console.log(JSON.stringify(this.userDetails))
    this.sportPoolService.updatePool(poolId,teamId,index,this.userDetails).subscribe(
      res=>{
        console.log(res)
      }
    )

  }

   getPool(id : string) {
     interval(10*100)
       .subscribe(() => {
         this.sportPoolService.getPoolDetails(id).subscribe(res=>{
           this.reservation = res;
           console.log(this.reservation)
           this.team1 =this.reservation.teamDtoList[0].teamName;
           this.team2 =this.reservation.teamDtoList[1].teamName;

         })
       });


  }


  getPoolMatch(id: any) {

    this.sportPoolService.getSportPool(id).subscribe(
      res=>{
        this.sportPoolDetails = res;
        this.getPool(this.sportPoolDetails.poolId)
      }
    );
  }

  getUser() {
      this.id = sessionStorage.getItem("user");
      this.userService.getProfile(this.id).subscribe(
        res=>{
          this.userDetails=  res;
        }
      );
  }
}
