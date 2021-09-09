import { Component, OnInit } from '@angular/core';
import {UserService} from "../../service/user.service";
import {UserDetails} from "../../model/user-details";
import {basename} from "@angular/compiler-cli/src/ngtsc/file_system";
import {Response} from "../../model/response";
import Swal from "sweetalert2";
import {DatePipe} from "@angular/common";
import {SportService} from "../../service/sport.service";
import {Sport} from "../../model/sport";

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

  constructor(private userService:UserService,private datePipe : DatePipe,private sportService:SportService) { }

  ngOnInit(): void {
    this.getProfileData();
    this.getAllSports();
  }

  logOut() {

  }

  fileChange(event: any) {
    let fileList: FileList = event.target.files;
    this.file = fileList[0];
    var reader = new FileReader();

    reader.onload = (event: any) => {
      this.image = event.target.result;

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
}
