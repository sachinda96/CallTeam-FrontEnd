import {TeamUser} from "./team-user";

export class Team {

  id:string = "";
  teamName:string = "";
  poolId:string = "";
  teamUserDtoList:Array<TeamUser> = new Array<TeamUser>();
}
