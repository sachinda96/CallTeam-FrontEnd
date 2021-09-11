import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlayerService} from "../../service/player.service";
import {PlayerDetails} from "../../model/player-details";
import Swal from "sweetalert2";
import {Response} from "../../model/response";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  rateNumber: number =0;
  playerDetails:PlayerDetails = new PlayerDetails();
  response:Response = new Response();
  loading: boolean = false;

  constructor(private routerActive: ActivatedRoute,private playerService:PlayerService) { }

  ngOnInit(): void {

    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.getPlayer(params.id);
      }
    });
  }

  setRate(number: number) {
    this.rateNumber = number;
    console.log(number)
  }

   getPlayer(id: any) {
    this.playerService.getPlayersById(id).subscribe(
      res=>{
        this.playerDetails = res;
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
}
