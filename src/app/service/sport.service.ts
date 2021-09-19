import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAIN} from "./auth.service";
import {Observable} from "rxjs";
import {Response} from "../model/response";


@Injectable({
  providedIn: 'root'
})
export class SportService {

  constructor(private http:HttpClient) { }

  getAll():Observable<any>{
    return this.http.get<any>(MAIN+"/sport/getAll")
  }

  save(formData:FormData):Observable<Response>{
    return this.http.post<Response>(MAIN+"/sport/save",formData);
  }

  update(formData:FormData):Observable<Response>{
    return this.http.post<Response>(MAIN+"/sport/update",formData);
  }

  delete(id : string):Observable<Response>{
    return this.http.delete<Response>(MAIN+"/sport/delete/"+id);
  }
}
