import { Pipe, PipeTransform } from '@angular/core';
import { User } from '../models/user';

@Pipe({
  name: 'searchByUsername'
})
export class SearchByUsernamePipe implements PipeTransform {

  transform(users: User[], text: string): User[] {
    let listOfUsers: User[] = [];
    users.forEach(
      (user) => {
        if (user.username?.includes(text)) {
          listOfUsers.push(user);
        }
      }
    )

    return listOfUsers;
  }

}
