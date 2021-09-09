import {Sport} from "./sport";
import {Team} from "./team";

export class SportPool {

  name:string = "";
  description:string = "";
  district:string = "";
  city:string = "";
  date:Date = new Date();
  stringDate:string = "";
  startTime:string = "";
  endTime:string = "";
  sport:Sport = new Sport();
  noOfPlayers:number = 0;
  teamDtoList:Array<Team> = new Array<Team>();

}
