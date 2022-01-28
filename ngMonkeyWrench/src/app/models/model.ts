import { EquipmentType } from "./equipment-type";

export class Model {
  id: number;
  name: string | undefined;
  modelNumber: string | undefined;
  description: string | undefined;
  fuelType: string | undefined;
  equipmentType: EquipmentType | undefined;

  constructor(id: number = 0, name?: string, modelNumber?: string, description?: string, fuelType?: string, equipmentType?: EquipmentType) {
    this.id = id;
    this.name = name;
    this.modelNumber = modelNumber;
    this.description = description;
    this.fuelType = fuelType;
    this.equipmentType = equipmentType;
  }
}
