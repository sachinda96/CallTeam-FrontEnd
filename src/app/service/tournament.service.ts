import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Tournament} from "../model/tournament";
import {Response} from "../model/response";
import {MAIN} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private http:HttpClient) { }

  save(tournament : Tournament){
    return this.http.post<Response>(MAIN+"/tournament",tournament);
  }

  getTournamentsByUserCity(id:any){
    return this.http.get<any>(MAIN+"/tournamentsByUserCity/"+id);
  }
}
