import { User } from "./user";

export class Address {
  id: number;
  user: User;
  street: string;
  street2: string;
  city: string;
  stateAbbv: string;
  zipCode: number;
  notes: string;

  constructor(
      id: number = 0,
      user: User = new User(),
      street: string = '',
      street2: string = '',
      city: string = '',
      stateAbbv: string = '',
      zipCode: number = 12345,
      notes: string = ''
    ){
    this.id = id;
    this.user = user;
    this.street = street;
    this.street2 = street2;
    this.city = city;
    this.stateAbbv = stateAbbv;
    this.zipCode = zipCode;
    this.notes = notes;
  }
}
