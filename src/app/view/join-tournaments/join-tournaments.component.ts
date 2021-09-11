import { Component, OnInit } from '@angular/core';
import {Reservation} from "../../model/reservation";
import {SportPoolDetails} from "../../model/sport-pool-details";
import {UserDetails} from "../../model/user-details";
import {SportPoolService} from "../../service/sport-pool.service";
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../service/user.service";
import {interval} from "rxjs";
import {Tournament} from "../../model/tournament";
import {TournamentDetails} from "../../model/tournament-details";
import {TournamentService} from "../../service/tournament.service";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-join-tournaments',
  templateUrl: './join-tournaments.component.html',
  styleUrls: ['./join-tournaments.component.css']
})
export class JoinTournamentsComponent implements OnInit {

  reservation: Reservation = new Reservation();
  tournamentDetails : TournamentDetails = new TournamentDetails();
  team1: any;
  team2: any;
  userDetails:UserDetails = new UserDetails();
  id: any = "";
  stringDate: any;

  constructor(private sportPoolService:SportPoolService,private routerActive: ActivatedRoute,private userService:UserService,private tournamentService:TournamentService,private datePipe:DatePipe) { }

  ngOnInit(): void {

    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.getTournamentMatch(params.id);
      }
    });

    this.getUser();

  }

  join(poolId:any,teamId:string,index:number) {
    this.sportPoolService.updatePool(poolId,teamId,index,this.userDetails).subscribe(
      res=>{
        console.log(res)
      }
    );
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


  getTournamentMatch(id: any) {

    this.tournamentService.getTournament(id).subscribe(
      res=>{
        this.tournamentDetails = res;
        this.stringDate = this.datePipe.transform(this.tournamentDetails.tournamentDto.startDate, 'dd-MMM-YYYY')
        this.getPool(this.tournamentDetails.tournamentDto.poolId)
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
