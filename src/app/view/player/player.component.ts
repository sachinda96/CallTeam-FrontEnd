import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PlayerService} from "../../service/player.service";
import {PlayerDetails} from "../../model/player-details";
import Swal from "sweetalert2";
import {Response} from "../../model/response";
import {ReviewService} from "../../service/review.service";
import {Review} from "../../model/review";

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
  reviewList:Array<Review> = new Array<Review>();
  review:Review = new Review();
  reviewUserId: any;
  receiveUserId: any;


  constructor(private routerActive: ActivatedRoute,private playerService:PlayerService,private reviewService:ReviewService) { }

  ngOnInit(): void {
    this.reviewUserId = sessionStorage.getItem("user");
    this.routerActive.params.subscribe((params) => {
      if (params.id != null || params.id != undefined) {
        this.receiveUserId = params.id;
        this.getPlayer(this.receiveUserId);
        this.getAllReviewByUser()
      }
    });
  }

  setRate(number: number) {
    this.rateNumber = number;
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

  saveReview(){

    this.loading = true;
    this.review.reviewUserId = this.reviewUserId;
    this.review.receiveUserId = this.reviewUserId;
    this.review.rate = this.rateNumber;

    console.log(this.review)
    this.reviewService.saveReview(this.review).subscribe(
      res=>{
        this.loading = false;
        this.response = res;
        Swal.fire({
          title: this.response.message,
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then( res=>{
          this.getAllReviewByUser();
        })
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

  getAllReviewByUser() {
    this.reviewService.getAllReviewByUser(this.reviewUserId).subscribe(
      res=>{
        this.reviewList = res;
        console.log(this.reviewList)
      }
    );
  }
}
