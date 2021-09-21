import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserDetails} from "../../model/user-details";
import {basename} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Response} from "../../model/response";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import {SportService} from "../../service/sport.service";
import {Sport} from "../../model/sport";
import {interval} from "rxjs";
import {SportPoolService} from "../../service/sport-pool.service";
import {ProgressPoolMatch} from "../../model/progress-pool-match";
import {Router} from "@angular/router";
import {PlayGround} from "../../model/play-ground";
import {SportPool} from "../../model/sport-pool";
import {TournamentPool} from "../../model/tournament-pool";
import {TournamentService} from "../../service/tournament.service";

@Component({
  selector: 'app-nav-dashboard',
  templateUrl: './nav-dashboard.component.html',
  styleUrls: ['./nav-dashboard.component.css',    "../../../../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.css",
    "../../../../node_modules/admin-lte/plugins/fontawesome-free/css/all.min.css",
    "../../../../node_modules/admin-lte/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css",
    "../../../../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.min.css",
    "../../../../node_modules/admin-lte/plugins/jqvmap/jqvmap.min.css",
    "../../../../node_modules/admin-lte/dist/css/adminlte.min.css",
    "../../../../node_modules/admin-lte/plugins/overlayScrollbars/css/OverlayScrollbars.min.css",
    "../../../../node_modules/admin-lte/plugins/daterangepicker/daterangepicker.css",
    "../../../../node_modules/admin-lte/plugins/summernote/summernote-bs4.min.css",
    "../../../../node_modules/admin-lte/plugins/datatables-bs4/css/dataTables.bootstrap4.min.css",
    "../../../../node_modules/admin-lte/plugins/datatables-responsive/css/responsive.bootstrap4.min.css",
    "../../../../node_modules/admin-lte/plugins/datatables-buttons/css/buttons.bootstrap4.min.css"]
})
export class NavDashboardComponent implements OnInit {
  name: any = "CALL TEAM";
  image: any= "http://ssl.gstatic.com/accounts/ui/avatar_2x.png";
  file: any;
  userDetails :UserDetails = new UserDetails();
  loading: boolean = false;
  formData:any;
  response:Response = new Response();
  tempDate:any;
  sportList: Array<Sport> = new Array<Sport>();
  tempSportList: Array<Sport> = new Array<Sport>();
  sport:any;
  id: any;
  progressPoolList: Array<ProgressPoolMatch> = new Array<ProgressPoolMatch>();
  tournamentPool: Array<TournamentPool> = new Array<TournamentPool>();
  isMatchSelect: boolean =  true;
  isTournamentSelect: boolean = false;
  isSettingSelect: boolean = false;


  constructor(private userService:UserService,private datePipe : DatePipe,private sportService:SportService,private sportPoolService : SportPoolService,private router:Router,private tournamentService:TournamentService) { }

  ngOnInit(): void {
    this.getProfileData();
    this.getAllSports();
    this.getSportPool();
    this.getTournaments();
    this.tempDate = this.datePipe.transform(new Date(),'yyyy-MM-dd');
  }

  getTournaments() {
    this.id = sessionStorage.getItem("user");
    this.tournamentPool = new Array<TournamentPool>();
    this.tournamentService.getTournamentsCreateByUser(this.id).subscribe(
      res=>{
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

  logOut() {

  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    this.file = fileList[0];
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.userDetails.imagePath = event.target.result;

    };

    reader.onerror = (event: any) => {
      console.log('File could not be read: ' + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);

  }

  save() {

    this.loading = true;
    this.userDetails.birthDay = new Date(this.tempDate);
    this.formData = new FormData();
    this.formData.append('file', this.file);
    this.formData.append('userDetailsDto', JSON.stringify(this.userDetails));

    this.userService.updateProfile(this.formData).subscribe(
      res=>{
        this.loading = false;
        this.response = res;
        Swal.fire({
          title: this.response.message,
          icon: 'success',
          showConfirmButton: true,
          allowOutsideClick: false,
          allowEscapeKey: false
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

  set() {

  }

  setSport(event: any) {

    let value = event.target.value;

    this.sport = this.sportList.find(e=> e.id == value)
    if(this.userDetails.sportList.length > 0){
      let user = this.userDetails.sportList.filter(e=> e == value)
      if(user.length == 0){
        this.userDetails.sportList.push(this.sport.id)
        this.tempSportList.push(this.sport);
      }
    }else {
      this.userDetails.sportList.push(this.sport.id);
      this.tempSportList.push(this.sport);
    }
  }

  removeSport(event: any){
    let value = event.target.value;
    this.sport = this.sportList.find(e=> e.id == value)
    this.userDetails.sportList.splice(this.userDetails.sportList.indexOf(value),1);
    this.tempSportList.splice(this.tempSportList.indexOf( this.sport),1);

  }

   getProfileData() {

    let id = sessionStorage.getItem("user");
    this.userService.getProfile(id).subscribe(
      res=>{
        this.userDetails =res;
        if(this.userDetails.sportList == null){
          this.userDetails.sportList = new Array();
        }
        this.tempDate = this.datePipe.transform(this.userDetails.birthDay,'yyyy-MM-dd');
        this.userDetails.birthDay = new Date(this.tempDate);
      },error => {
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

  getAllSports() {

    this.sportService.getAll().subscribe(
      res=>{
        this.sportList = res;
        this.userDetails.sportList.forEach(e=>{
          this.sport = this.sportList.find(x=> x.id == e)
          this.tempSportList.push(this.sport);
        })
      }
    );

  }

  getSportPool() {
    this.id = sessionStorage.getItem("user");
    this.progressPoolList = new Array<ProgressPoolMatch>();
    this.sportPoolService.getAllSportPoolCreateByUser(this.id).subscribe(
      res=>{
        console.log(res)
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

  cancel(pool: ProgressPoolMatch) {

      Swal.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showConfirmButton: true,
        showCancelButton:true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: 'Yes, cancel it!'
      }).then((result) => {
        if(result.isConfirmed){
          this.sportPoolService.cancelSportPool(pool.id).subscribe(
            res=>{
              this.loading = false;
              this.response = res;
              this.getTournaments();
              Swal.fire({
                title: this.response.message,
                icon: 'success',
                showConfirmButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false
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
      });

  }

  routeJoin(pool:ProgressPoolMatch) {
    this.router.navigate(['joinpool',pool.id])
  }

  routeTournament(tournament: TournamentPool) {
    this.router.navigate(['jointournament',tournament.id])
  }

  cancelTournament(tournament: TournamentPool) {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton:true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if(result.isConfirmed){
        this.tournamentService.cancelTournament(tournament.id).subscribe(
          res=>{
            this.loading = false;
            this.response = res;
            this.getSportPool();
            Swal.fire({
              title: this.response.message,
              icon: 'success',
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false
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
    });
  }

  isMatch() {
    this.isMatchSelect = true;
    this.isTournamentSelect = false;
    this.isSettingSelect = false;
  }

  isTournament() {
    this.isMatchSelect = false;
    this.isTournamentSelect = true;
    this.isSettingSelect = false;
  }

  isSettings() {
    this.isMatchSelect = false;
    this.isTournamentSelect = false;
    this.isSettingSelect = true;
  }
}
