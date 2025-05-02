import { Promotion } from "./promotion";
import { User } from "./user";

export interface Student extends User {
  promotions: Promotion[];
}
