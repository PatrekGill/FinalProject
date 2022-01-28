import { Address } from "./address";
import { Model } from "./model";

export class Equipment {
  id: number;
  serialNumber: string | undefined;
  price: number | undefined;
  model: Model | undefined;
  address: Address | undefined;


  constructor(id: number=0, serialNumber?: string, price?: number, model?: Model, address?: Address) {
    this.id = id,
    this.serialNumber = serialNumber,
    this.price = price
    this.model = model;
    this.address = address;
  }
}
