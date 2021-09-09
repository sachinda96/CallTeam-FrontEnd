import { Component, OnInit } from '@angular/core';
import {Sport} from "../../model/sport";
import {Response} from "../../model/response";
import {SportPool} from "../../model/sport-pool";
import {UserDetails} from "../../model/user-details";
import {Reservation} from "../../model/reservation";
import {PlayGround} from "../../model/play-ground";
import {SportPoolReservation} from "../../model/sport-pool-reservation";
import {SportService} from "../../service/sport.service";
import {Router} from "@angular/router";
import {UserService} from "../../service/user.service";
import {SportPoolService} from "../../service/sport-pool.service";
import {PlayGroundService} from "../../service/play-ground.service";
import {DatePipe} from "@angular/common";
import Swal from "sweetalert2";
import {UserPool} from "../../model/user-pool";
import {Team} from "../../model/team";
import {MERCHANT_ID} from "../../../environments/environment";
import {Tournament} from "../../model/tournament";
import {TournamentService} from "../../service/tournament.service";

declare var payhere: any;

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.css']
})
export class NewTournamentComponent implements OnInit {

  loading: boolean = false;
  activeDetails: any= "active";
  activePool: any= "";
  activeFinish: any = "";
  step1: boolean = true;
  step2: boolean = false;
  step3: boolean = false;
  step4: boolean = false;
  selectEdit1: boolean = false;
  selectEdit2: boolean = false;
  tournament : Tournament = new Tournament();

  activeGround: any = "";
  sportList:Array<Sport> = new Array<Sport>();
  response:Response = new Response();
  spot: Sport = new Sport();
  sportPool: SportPool = new SportPool();
  dateValidate: boolean = false;
  cityValidate: boolean = false;
  districtValidate: boolean = false;
  nameValidate:  boolean = false;
  startTimeValidate:  boolean = false;
  endTimeValidate:  boolean = false;
  endTimeGreterThanValidate:  boolean = false;
  nopThanValidate:  boolean = false;
  playerCountList:Array<number> = new Array<number>();
  stompClient:any;
  id:any = null;
  userDetails:UserDetails = new UserDetails();
  reservation:Reservation = new Reservation();
  groundList:Array<PlayGround> = new Array<PlayGround>();
  playGround: PlayGround = new PlayGround();
  date: Date = new Date();
  stringDate:any;
  searchValue: any = "";
  teamSportList:Array<Sport> = new Array<Sport>();
  sportPoolReservation:SportPoolReservation = new SportPoolReservation();
  nopThanTeam: any;

  constructor(private sportService:SportService,private route:Router,private userService:UserService,private sportPoolService:SportPoolService,private playGroundService:PlayGroundService,private datePipe : DatePipe,private tournamentService:TournamentService) {

    payhere.onCompleted = function onCompleted(orderId: any) {
      console.log("Payment completed. OrderID:" + orderId);

    };

    payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    payhere.onError = function onError(error: any) {
      console.log("Error:" + error);
    };

  }

  ngOnInit(): void {

    this.id = sessionStorage.getItem("user");
    this.stringDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
    if(this.id != ""){
      this.getAllSport();
      this.getUser(this.id);
    }else {
      Swal.fire({
        title: "You have to login first",
        icon: 'error',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
      this.route.navigate(['login']);
    }



  }


  next1() {

    if(this.validateForm()) {

      this.step1 = false;
      this.step2 = true;
      this.activeDetails = "activeno";
      this.activePool = "active";

      this.loading = true;

      this.sportPool = new SportPool();
      this.sportPool.sport = this.spot;
      this.sportPool.noOfPlayers = this.tournament.noOfPlayers;
      this.sportPool.city = this.tournament.city;
      this.sportPool.name = this.tournament.tournamentName;
      this.sportPool.endTime = this.tournament.endTime;
      this.sportPool.startTime = this.tournament.startTime;
      this.sportPool.description = this.tournament.tournamentDescription;
      this.sportPool.date =new Date(this.tournament.stringDate);
      this.sportPool.district = this.tournament.district;
      this.sportPool.noOfTeam = this.tournament.noOfTeam;

      let userPool: UserPool = new UserPool();
      userPool.userDetailsDto = this.userDetails;
      userPool.poolDto = this.sportPool;
      this.tournament.startDate = new Date(this.tournament.stringDate);

      this.sportPoolService.createPool(userPool).subscribe(
        res => {
          this.response = res;
          this.sportPoolService.getPoolDetails(this.response.message).subscribe(
            response => {
              this.loading = false;
              this.reservation = response;
            }, error => {
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
        }, error => {
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


      this.playGroundService.getAllByCity(this.sportPool.city).subscribe(
        res => {
          console.log(res)
          this.groundList = res;
        }
      );
    }
  }


  poolNext() {
    this.step2 = false;
    this.step3 = true;
    this.activeGround = "active";
    this.activePool = "";
  }

  backGround() {
    this.step3 = false;
    this.activeGround ="activeno"
    this.next1();
  }

  backPool() {
    this.step2 = false;
    this.step1 = true;
    this.activePool = "activeno";
    this.activeDetails = "active";
  }

  getAllSport() {

    this.loading = true;
    this.sportService.getAll().subscribe(
      res=>{
        this.loading = false;
        this.sportList = res;
        this.teamSportList =res;
      },error => {
        this.loading = false;
        this.response = error.error;
        Swal.fire({
          title: this.response.message,
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }

    )

  }

  setSelect(sport: Sport) {
    sport.selected =true;
    this.tournament.noOfPlayers = sport.numberOfPlayers;
    this.spot = sport;
    this.sportList.forEach(e=>{
      if(e.id != this.spot.id){
        e.selected = false;
      }
    });
  }

  setDistrict(event: any) {
    this.tournament.district = event.target.value;
  }

  setCity(event: any) {
    this.tournament.city = event.target.value;
  }

  validateForm():boolean{

    let isValid = true;
    this.dateValidate = false;
    this.cityValidate =false;
    this.districtValidate = false;
    this.nameValidate = false;
    this.startTimeValidate = false;
    this.endTimeValidate = false;
    this.endTimeGreterThanValidate = false;
    this.nopThanValidate = false;
    if(this.tournament.tournamentName == ""){
      this.nameValidate = true;
      isValid = false;
    }
    if(this.tournament.district == ""){
      this.districtValidate = true;
      isValid = false;
    }
    if(this.tournament.city == ""){
      this.cityValidate = true;
      isValid = false;
    }
    if(this.tournament.stringDate == ""){
      this.dateValidate = true;
      isValid = false;
    }
    if(this.tournament.startTime == ""){
      this.startTimeValidate = true;
      isValid = false;
    }
    if(this.tournament.endTime == ""){
      this.endTimeValidate = true;
      isValid = false;
    }else if(this.tournament.startTime >= this.tournament.endTime){
      this.endTimeGreterThanValidate = true;
      isValid = false;
    }

    if(this.tournament.noOfPlayers == 0){
      this.nopThanValidate = true;
      isValid = false;
    }

    if(this.tournament.noOfTeam <= 2){
      this.nopThanTeam = true;
      isValid = false;
    }



    if(isValid == true && this.spot.id == ""){
      isValid = false;
      Swal.fire({
        title: "Sport can not empty. please select the Sport",
        icon: 'warning',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }

    return isValid;

  }

  getUser(id: any) {

    this.loading = true;
    this.userService.getProfile(id).subscribe(
      res=>{
        this.loading = false;
        this.userDetails = res;
      },error => {
        this.loading = false;
        this.response = error.error;
        Swal.fire({
          title: this.response.message,
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      }
    );

  }

  join(team: Team) {

  }

  selectGround(ground: PlayGround) {
    this.playGround = ground;
  }

  nextFinal() {
    this.step3 = false;
    this.step4 = true;
    this.activeGround = "activeno";
    this.activeFinish = "active";
  }


  paynow() {

    var payment = {
      "sandbox": true,
      "merchant_id": MERCHANT_ID,
      "return_url": undefined,
      "cancel_url": undefined,
      "notify_url": "",
      "amount": "2600",
      "order_id": this.userDetails.id,
      "items": this.playGround.name,
      "currency": "LKR",
      "first_name": this.userDetails.fullName,
      "last_name": "",
      "email": this.userDetails.email,
      "phone": this.userDetails.contactNo,
      "address": this.userDetails.address,
      "city": this.userDetails.city,
      "country": "Sri Lanka",
      "delivery_address": "",
      "delivery_city": "",
      "delivery_country": "Sri Lanka",
      "custom_1": "",
      "custom_2": ""
    };

    payhere.startPayment(payment);

  }

  search() {
    if(this.searchValue == ""){
      this.teamSportList = this.sportList;
    }else{
      this.teamSportList = this.teamSportList.filter(e=> e.name.includes(this.searchValue));
    }

  }

  backFinal() {
    this.activeFinish= "noactive";
    this.poolNext();
  }

  save(){

    this.loading = true;

    this.tournament.groundId = this.playGround.id;
    this.tournament.sportId = this.spot.id;
    this.tournament.poolId =  this.reservation.poolId;

    this.tournamentService.save(this.tournament).subscribe(
      response=>{
        this.loading = false;
        this.response = response;
        Swal.fire({
          title: this.response.message,
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then(
          res => {
            this.route.navigate(['']);
          }
        );
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
