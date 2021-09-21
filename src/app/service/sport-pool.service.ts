import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {UserDetails} from "../model/user-details";
import {SportPool} from "../model/sport-pool";
import {Response} from "../model/response";
import {MAIN} from "./auth.service";
import {UserPool} from "../model/user-pool";
import {SportPoolReservation} from "../model/sport-pool-reservation";

@Injectable({
  providedIn: 'root'
})
export class SportPoolService {

  constructor(private http:HttpClient) { }

  createPool(userPool:UserPool){
    return this.http.post<any>(MAIN+"/pool/create",userPool);
  }

  updatePool(poolId:string,teamId:string, index:number, userDetails:UserDetails){
    return this.http.post<any>(MAIN+"/pool/update/"+poolId+"/"+teamId+"/"+index,userDetails);
  }

  getPoolDetails(id:string){
    return this.http.get<any>(MAIN+"/pool/getPoolDetails/"+id);
  }

  saveSportPool(sportPoolReservation:SportPoolReservation){
    return this.http.post<any>(MAIN+"/pool/savepool/",sportPoolReservation);
  }

  getAllSportPoolByUser(userId : string){
    return this.http.get<any>(MAIN+"/pool/getAllSportPoolByUser/"+userId);
  }

  getSportPool(id : string){
    return this.http.get<any>(MAIN+"/pool/getSportPool/"+id);
  }

  getAllSportPoolCreateByUser(id: any) {
    return this.http.get<any>(MAIN+"/pool/getAllSportPoolCreateByUser/"+id);
  }

  cancelSportPool(id: any){
    return this.http.delete<any>(MAIN+"/pool/cancelSportPool/"+id);
  }
}
