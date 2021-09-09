import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAIN} from "./auth.service";
import {Observable} from "rxjs";
import {Sport} from "../model/sport";

@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<any>(MAIN+"/sport/getAll")
  }
}
