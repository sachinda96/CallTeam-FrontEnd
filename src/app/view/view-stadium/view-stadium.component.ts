import { Component, OnInit } from '@angular/core';
import {PlayGroundService} from "../../service/play-ground.service";
import {PlayGround} from "../../model/play-ground";
import {Router} from "@angular/router";

@Component({
  selector: 'app-view-stadium',
  templateUrl: './view-stadium.component.html',
  styleUrls: ['./view-stadium.component.css']
})
export class ViewStadiumComponent implements OnInit {

  pagesList:Array<string> = new Array<string>();
  groundList: Array<PlayGround> = new Array<PlayGround>();
  index = 1;

  constructor(private playGroundService:PlayGroundService,private route:Router) { }

  ngOnInit(): void {
    this.pagesCount();
    this.getAllByIndex(this.index);
  }

  pagesCount() {
    this.playGroundService.pagesCount().subscribe(
      res=>{
        this.pagesList = res;
      }
    );
  }

  getAllByIndex(index:any){
    this.playGroundService.getAllByPage(index).subscribe(
      res=>{
        this.groundList = res;
      }
    );
  }


  navigateDetails(id:string) {
    this.route.navigate(['stadiumdetails',id])
  }
}
