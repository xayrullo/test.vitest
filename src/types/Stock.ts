import type { IPartner } from "./Partner";

export interface IStock {
  months: Array<number>,
  partners: Array<IPartner>
}