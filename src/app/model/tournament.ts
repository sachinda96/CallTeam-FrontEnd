import {Payment} from "./payment";

export class Tournament {

  poolId:string = "";
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
  userId : string = "";
  paymentDto : Payment = new Payment();
  stringDate: string = "";
  paymentNote: string = "";
}
