import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MAIN} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAll(){
    return this.http.get<any>(MAIN+"/category")
  }
}
