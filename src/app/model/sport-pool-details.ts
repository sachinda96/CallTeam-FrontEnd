import {Sport} from "./sport";
import {PlayGround} from "./play-ground";
import {SportPool} from "./sport-pool";

export class SportPoolDetails {

  id :string = "";
  poolId : string = "";
  sportDto : Sport = new Sport();
  playGroundDto : PlayGround = new PlayGround();
  poolDto : SportPool = new SportPool();

}
