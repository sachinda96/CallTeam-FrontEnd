import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MAIN} from "./auth.service";
import {Review} from "../model/review";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private http:HttpClient) { }

  saveReview(review:Review):Observable<any>{
    return this.http.post<any>(MAIN+"/review",review)
  }

  getAllReviewByUser(id:string):Observable<any>{
    return this.http.get<any>(MAIN+"/review/"+id)
  }
}
