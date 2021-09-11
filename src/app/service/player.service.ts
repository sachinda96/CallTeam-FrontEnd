import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAIN} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http:HttpClient) { }

  getAllPlayers():Observable<any>{
    return this.http.get<any>(MAIN+"/player/getAll")
  }

  getPlayersById(id:string):Observable<any>{
    return this.http.get<any>(MAIN+"/player/getPlayersById/"+id)
  }
}
