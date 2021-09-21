import { Component, OnInit } from '@angular/core';
import {User} from "../../model/user";
import Swal from 'sweetalert2'
import {UserService} from "../../service/user.service";
import {AuthService} from "../../service/auth.service";
import {Login} from "../../model/login";
import {Response} from "../../model/response";
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginResponse} from "../../model/login-response";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  islogin: boolean = false;
  type: any= "I already have a membership";
  regtype: any = "Registration";
  user:User = new User();
  logindata:Login = new Login();
  loading: boolean = false;
  response:Response = new Response();
  loginResponse:LoginResponse = new LoginResponse();

  heroForm : any;
  fullNameValidate: boolean = false;



  constructor(private userService:UserService,private authService:AuthService,private route:Router) { }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      email: new FormControl(this.user.email, Validators.required)
    });
  }

  alreadyLogin() {
    if(this.islogin == true){
      this.regtype = "Registration";
      this.type = "I already have a membership";
      this.islogin = false;
    } else {
      this.regtype = "Login";
      this.type = "I don't have an account";
      this.islogin = true;
    }
  }

  register() {

    if(this.user.password != this.user.repassword){
      Swal.fire({
        title: "Entered passwords do not match",
        icon: 'error',
        showConfirmButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false
      })
    }else {


      let emailRegExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

      if(this.user.fullName == ""){
        this.generateValidationAlert("Full name is required");
      }else if(this.user.email == ""){
        this.generateValidationAlert("Email is required");
      }else if(this.user.email == ""){
        this.generateValidationAlert("Email is required");
      }else if(!emailRegExp.test(this.user.email)){
        this.generateValidationAlert("Invalid email address");
      }else if(this.user.password == ""){
        this.generateValidationAlert("Invalid password");
      }else{

       this.loading = true;

        this.userService.register(this.user).subscribe(
          res => {
            this.loading = false;
            this.response = res;
            Swal.fire({
              title: this.response.message,
              icon: 'success',
              showConfirmButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false
            }).then(
              res => {
                this.islogin = true;
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
      }
    }

  }

  generateValidationAlert(message:String){
    Swal.fire({
      title: message,
      icon: 'warning',
      showConfirmButton: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    })
  }

  login() {

    this.loading = true;
    this.logindata = new Login();
    this.logindata.email = this.user.email;
    this.logindata.password = this.user.password;

    this.authService.login(this.logindata).subscribe(
      res=>{
        this.loginResponse = res;
        this.loading = false;
        sessionStorage.setItem("token",this.loginResponse.token);
        sessionStorage.setItem("user",this.loginResponse.id);
        this.route.navigate([''])
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
