import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'phoneNumber'
})
export class PhoneNumberPipe implements PipeTransform {

  transform(clientList: User[], phoneNumber: string): User[] {
    if(!clientList){
      return clientList;
    }

    return clientList.filter(client => client.phoneNumber?.toLowerCase()
    .indexOf(phoneNumber.toLowerCase()) !== -1);
  }


}
