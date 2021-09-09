import { Injectable } from '@angular/core';
import {Login} from "../model/login";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

export const MAIN ="http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(login:Login):Observable<any>{
    return this.http.post(MAIN+"/user/login",login);
  }
}
