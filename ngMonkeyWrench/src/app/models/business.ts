import { ServiceType } from "./service-type";
import { User } from "./user";

export class Business {
  id: number;
  user: User | undefined;
  enabled: boolean;
  name: string | undefined;
  logoUrl: string | undefined;
  createdDate: Date | undefined;
  updatedDate: Date | undefined;
  users: User[] | undefined;
  serviceTypes: ServiceType[] | undefined;

  constructor(
    id: number = 0,
    enabled: boolean = true,
    name?: string,
    logoUrl?: string,
    createdDate?: Date,
    updatedDate?: Date,
    users?: User[],
    serviceTypes?: ServiceType[]
  ) {
    this.id = id;
    this.enabled = enabled;
    this.name = name;
    this.logoUrl = logoUrl;
    this.createdDate = createdDate;
    this.updatedDate = updatedDate;
    this.users = users;
    this.serviceTypes = serviceTypes;
  }
}

