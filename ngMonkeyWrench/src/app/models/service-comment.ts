import { ServiceCall } from "./service-call";
import { User } from "./user";

export class ServiceComment {
  id: number;
  user: User | undefined;
  serviceCall: ServiceCall | undefined;
  text: string | undefined;
  commentDate: Date | undefined;

  constructor(id: number = 0, user?: User, serviceCall?: ServiceCall, text?: string, commentDate?: Date){
    this.id = id;
    this.user = user;
    this.serviceCall = serviceCall;
    this.text = text;
    this.commentDate = commentDate;
  }
}
