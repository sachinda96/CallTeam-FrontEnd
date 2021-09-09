import {Sport} from "./sport";
import {SportPool} from "./sport-pool";

export class SportPoolReservation {

  userId : string = "";
  sportId : string = "";
  poolDto : SportPool = new SportPool();
  poolId : string = "";
  //private PaymentDto paymentDto;
  groundId : string = "";
}
