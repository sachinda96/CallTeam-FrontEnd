import { Component, OnInit } from '@angular/core';
import {SportService} from "../../service/sport.service";
import {Sport} from "../../model/sport";
import {CategoryService} from "../../service/category.service";
import {Category} from "../../model/category";
import Swal from "sweetalert2";
import {Response} from "../../model/response";
import {PlayGroundService} from "../../service/play-ground.service";
import {PlayGround} from "../../model/play-ground";
import {PlayGroundSport} from "../../model/play-ground-sport";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css',
    "../../../../node_modules/admin-lte/plugins/icheck-bootstrap/icheck-bootstrap.css",
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
export class AdminDashboardComponent implements OnInit {

  sportList:Array<Sport> = new Array<Sport>();
  isView: boolean = true;
  imagePath: any= "assets/images/run.jpg";
  file: any;
  categoryList:Array<Category> = new Array<Category>();
  playGroundList:Array<PlayGround> = new Array<PlayGround>();
  categoryId:string = "";
  sport:Sport = new Sport();
  playGround:PlayGround = new PlayGround();
  loading: boolean = false;
  response:Response = new Response();
  isStadium: boolean = false;
  isStadiumView: boolean = true;
  isSubStadiumView: boolean =true;
  playgroundImagePath: any = "assets/images/playground.png";
  priceperhour: any =0;
  tempSport: any = new Sport();
  not: number = 0;
  filePlayGround: any;


  constructor(private sportService:SportService,private categoryService:CategoryService,private playGroundService:PlayGroundService) { }

  ngOnInit(): void {
    this.getAllSports();
    this.getAllCategory();
    this.getAllGrounds();
  }

  getAllSports(){
    this.sportList = new Array<Sport>();
    this.sportService.getAll().subscribe(
      res=>{
        this.sportList = res;
      }
    );
  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    this.file = fileList[0];
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.imagePath = event.target.result;

    };

    reader.onerror = (event: any) => {
      console.log('File could not be read: ' + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

   getAllCategory() {
    this.categoryList = new Array<Category>();
    this.categoryService.getAll().subscribe(
      res=>{
        this.categoryList = res;
      }
    );
  }

  setCategory(event: any) {
    console.log(event.target.value)
    this.categoryId = event.target.value;
  }

  save() {

    this.sport.categoryId = this.categoryId;
    let formData = new FormData();
    formData.append('file', this.file);
    formData.append('sport', JSON.stringify(this.sport));

    if(this.sport.id == ""){
      this.sportService.save(formData).subscribe(
        res=>{
          this.loading = false;
          this.response = res;
          Swal.fire({
            title: this.response.message,
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(res=>{
            this.sport = new Sport();
            this.imagePath= "assets/images/run.jpg";
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
    }else {
      this.sportService.update(formData).subscribe(
        res=>{
          this.loading = false;
          this.response = res;
          Swal.fire({
            title: this.response.message,
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(res=>{
            this.sport = new Sport();
            this.imagePath= "assets/images/run.jpg";
            this.isView = true;
            this.getAllSports();
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

  }

  editSport(sport: Sport) {
    this.isView = false;
    this.sport = sport;
    this.imagePath = sport.imagePath;
    this.categoryId = sport.categoryId;
  }

  deleteSport(sport: Sport) {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton:true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed){
        this.sportService.delete(sport.id).subscribe(
          res=>{
            this.loading = false;
            this.response = res;
            Swal.fire({
              title: this.response.message,
              icon: 'success',
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(res=>{
              this.getAllSports();
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

  getAllGrounds() {
      this.playGroundService.getAll().subscribe(
        res=>{
          this.playGroundList = res;
        }
      );
  }

  generate() {
    window.open(' https://www.latlong.net/', "_blank");

  }

  setSport(event: any ) {
    this.tempSport = this.sportList.find(e=> e.id == event.target.value);

  }

  addSportPlayground() {

    let playGroundSport = new PlayGroundSport();
    playGroundSport.sport = this.tempSport.name;
    playGroundSport.noOfTeams = this.not;
    playGroundSport.sportId= this.tempSport.id;
    playGroundSport.pricePerHour = this.priceperhour;
    this.playGround.playGroundSportDtoList.push(playGroundSport);

  }

  deletePlayGroundSport(data: PlayGroundSport) {
    this.playGround.playGroundSportDtoList.splice(this.playGround.playGroundSportDtoList.indexOf(data),1)
  }

  savePlaygrounds() {

    let formData = new FormData();
    formData.append('file', this.filePlayGround);
    formData.append('playGround', JSON.stringify(this.playGround));
    this.loading = true;
    if(this.playGround.id == ""){
      this.playGroundService.save(formData).subscribe(
        res=>{
          this.loading = false;
          this.response = res;
          Swal.fire({
            title: this.response.message,
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(res=>{
            this.playGround = new PlayGround();
            this.playgroundImagePath= "assets/images/playground.png";
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
    }else {
      this.playGroundService.update(formData).subscribe(
        res=>{
          this.loading = false;
          this.response = res;
          Swal.fire({
            title: this.response.message,
            icon: 'success',
            showConfirmButton: true,
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then(res=>{
            this.sport = new Sport();
            this.playgroundImagePath= "assets/images/playground.png";
            this.isStadiumView = true;
            this.getAllSports();
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


  }

  fileChangePlayGround(event: any) {
    let fileList: FileList = event.target.files;
    this.filePlayGround = fileList[0];
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.playgroundImagePath = event.target.result;

    };

    reader.onerror = (event: any) => {
      console.log('File could not be read: ' + event.target.error.code);
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  deletePlayGround(playground: PlayGround) {

    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showConfirmButton: true,
      showCancelButton:true,
      allowOutsideClick: false,
      allowEscapeKey: false,
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if(result.isConfirmed){
        this.playGroundService.delete(playground.id).subscribe(
          res=>{
            this.loading = false;
            this.response = res;
            Swal.fire({
              title: this.response.message,
              icon: 'success',
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(res=>{
              this.getAllGrounds();
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

  editPlayGround(playground: PlayGround) {
    this.isStadiumView = false;
    this.playGround = playground;
    console.log(this.playGround)
    this.playgroundImagePath = playground.imagePath;
  }
}
