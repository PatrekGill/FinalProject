import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'lastName'
})
export class LastNamePipe implements PipeTransform {

  transform(clientList: User[], lastName: string): User[] {
    if(!clientList){
      return clientList;
    }

    return clientList.filter(client => client.lastName?.toLowerCase()
    .indexOf(lastName.toLowerCase()) !== -1);
  }
}


