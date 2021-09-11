import {PlayGroundSport} from "./play-ground-sport";

export class PlayGround {

  id : string = "";
  name : string = "";
  description : string = "";
  address : string = "";
  city : string = "";
  district : string = "";
  longitude : string = "";
  latitude : string = "";
  openTime : string = "";
  closeTime : string = "";
  contactNo:string = "";
  imagePath : string = "";
  price : string = "Free";
  status : string = "";
  closeDays : Array<String> = new Array<String>();
  sportList : Array<String> = new Array<String>();
  playGroundSportDtoList : Array<PlayGroundSport> = new Array<PlayGroundSport>();
}
