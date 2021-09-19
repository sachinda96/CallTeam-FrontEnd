import { Component, OnInit } from '@angular/core';
import {ProgressPoolMatch} from "../../model/progress-pool-match";
import {Response} from "../../model/response";
import {SportPoolService} from "../../service/sport-pool.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {TournamentService} from "../../service/tournament.service";
import {TournamentPool} from "../../model/tournament-pool";
import {SportService} from "../../service/sport.service";
import {PlayGroundService} from "../../service/play-ground.service";
import {Sport} from "../../model/sport";
import {PlayGround} from "../../model/play-ground";

@Component({
  selector: 'app-view-tournaments',
  templateUrl: './view-tournaments.component.html',
  styleUrls: ['./view-tournaments.component.css']
})
export class ViewTournamentsComponent implements OnInit {

  id: any;
  tournamentPool: Array<TournamentPool> = new Array<TournamentPool>();
  loading: boolean = false;
  response: Response = new Response();
  sportList:Array<Sport> = new Array<Sport>();
  playGroundList:Array<PlayGround> = new Array<PlayGround>();

  constructor(private tournamentService:TournamentService,private router:Router,private sportService:SportService,private playGroundService:PlayGroundService) { }

  ngOnInit(): void {
    this.getTournamentsByUserCity();
    this.getAllSport();
    this.getAllPlayGround();
  }


  getTournamentsByUserCity() {
    this.id = sessionStorage.getItem("user");
    this.tournamentService.getTournamentsByUserCity(this.id).subscribe(
      res=>{
        console.log(res)
        this.tournamentPool = res;
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

  routeJoin(tournamentPool:TournamentPool) {
    this.router.navigate(['jointournament',tournamentPool.id])
  }

  routeNewMatch() {
    this.router.navigate(['newtournament'])
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
