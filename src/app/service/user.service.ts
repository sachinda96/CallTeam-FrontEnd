import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {MAIN} from "./auth.service";
import {Response} from "../model/response";
import {UserDetails} from "../model/user-details";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  register(user:User):Observable<Response>{
    return this.http.post<Response>(MAIN+"/user/register",user);
  }

  updateProfile(formData:FormData):Observable<Response>{
    return this.http.post<Response>(MAIN+"/user/updateProfile",formData);
  }

  getProfile(id:any):Observable<any>{
    return this.http.get<any>(MAIN+"/user/getProfile/"+id);
  }
}
