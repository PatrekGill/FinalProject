import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'firstName'
})
export class FirstNamePipe implements PipeTransform {

  transform(clientList: User[], firstName: string): User[] {
    if(!clientList){
      return clientList;
    }

    return clientList.filter(client => client.firstName?.toLowerCase()
    .indexOf(firstName.toLowerCase()) !== -1);
  }

}
