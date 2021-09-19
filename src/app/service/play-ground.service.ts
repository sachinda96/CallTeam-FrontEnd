import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MAIN} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class PlayGroundService {

  constructor(private http:HttpClient) { }

  save(formData:FormData):Observable<any>{
    return this.http.post<any>(MAIN+"/playground/save",formData)
  }

  update(formData:FormData):Observable<any>{
    return this.http.post<any>(MAIN+"/playground/update",formData)
  }

  delete(id:string):Observable<any>{
    return this.http.delete<any>(MAIN+"/playground/delete/"+id)
  }

  getAll():Observable<any>{
    return this.http.get<any>(MAIN+"/playground")
  }

  getAllByCity(city:string):Observable<any>{
    return this.http.get<any>(MAIN+"/playground/getAllByCity/"+city)
  }

  pagesCount():Observable<any>{
    return this.http.get<any>(MAIN+"/playground/pageCount")
  }

  getAllByPage(index:any):Observable<any>{
    return this.http.get<any>(MAIN+"/playground/"+index)
  }

  getById(id:string):Observable<any>{
    return this.http.get<any>(MAIN+"/playground/getById/"+id)
  }

  getAllBySportId(id:string){
    return this.http.get<any>(MAIN+"/playground/getAllBySportId/"+id)
  }

}
