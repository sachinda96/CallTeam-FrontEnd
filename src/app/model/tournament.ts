import {Payment} from "./payment";

export class Tournament {

  tournamentName : string = "";
  tournamentDescription : string = "";
  startDate : Date = new Date();
  city :  string = "";
  district : string = "";
  startTime : string = "";
  endTime : string = "";
  noOfPlayers : number = 0;
  noOfTeam : number = 0;
  sportId : string = "";
  groundId :string = "";
  paymentDto : Payment = new Payment();
}
