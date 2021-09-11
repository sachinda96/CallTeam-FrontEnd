import { Component, OnInit } from '@angular/core';
import {PlayerService} from "../../service/player.service";
import {Players} from "../../model/players";
import Swal from "sweetalert2";
import {Response} from "../../model/response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  playerList:Array<Players> = new Array<Players>();
  response:Response = new Response();
  loading: boolean = false;

  constructor(private playerService:PlayerService,private router:Router) { }

  ngOnInit(): void {
    this.allPlayers();
  }

  search() {

  }

  allPlayers() {
    this.playerService.getAllPlayers().subscribe(
      res=>{
        this.playerList = res;
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

  routePlayer(id:string){
    this.router.navigate(['player',id])
  }
}
