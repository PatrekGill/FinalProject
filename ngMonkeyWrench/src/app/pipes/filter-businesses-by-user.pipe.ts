import { Pipe, PipeTransform } from '@angular/core';
import { Business } from '../models/business';
import { User } from '../models/user';

@Pipe({
  name: 'filterBusinessesByUser'
})
export class FilterBusinessesByUserPipe implements PipeTransform {

  transform(businesses: Business[], doFilter: boolean, user:User): Business[] {
    const filtered: Business[] = [];
    const userId = user.id;
    businesses.forEach(
      (business) => {
        if (!doFilter || business.user?.id === userId) {
          filtered.push(business);
        }
      }
    )

    return filtered;
  }

}
