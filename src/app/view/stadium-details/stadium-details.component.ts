import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlayGroundService} from "../../service/play-ground.service";
import {PlayGround} from "../../model/play-ground";
import Swal from "sweetalert2";
import {Response} from "../../model/response";

@Component({
  selector: 'app-stadium-details',
  templateUrl: './stadium-details.component.html',
  styleUrls: ['./stadium-details.component.css']
})
export class StadiumDetailsComponent implements OnInit {

  loading: boolean = false;
  playGround:PlayGround = new PlayGround();
  response:Response = new Response();
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor(private routerActive: ActivatedRoute,private playGroundService:PlayGroundService) { }

  ngOnInit(): void {

    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.getGround(params.id);
      }
    });
  }

  getGround(id: string) {

    this.loading = true;
    this.playGroundService.getById(id).subscribe(
      res=>{
        this.loading = false;
        this.playGround = res;
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
