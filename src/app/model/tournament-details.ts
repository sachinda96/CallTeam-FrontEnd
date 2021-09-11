import {Tournament} from "./tournament";
import {Sport} from "./sport";
import {PlayGround} from "./play-ground";
import {Payment} from "./payment";

export class TournamentDetails {

  id: string = "";
  tournamentDto :Tournament = new Tournament();
  sportDto : Sport = new Sport();
  playGroundDto:PlayGround = new PlayGround();
  paymentDto : Payment = new Payment();
}
