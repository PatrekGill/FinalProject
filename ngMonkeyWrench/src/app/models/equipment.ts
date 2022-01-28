export class Equipment {
  id: number;
  serialNumber: string | undefined;
  price: number | undefined;

  constructor(id: number=0, serialNumber?: string, price?: number) {
    this.id = id,
    this.serialNumber = serialNumber,
    this.price = price
  }
}
