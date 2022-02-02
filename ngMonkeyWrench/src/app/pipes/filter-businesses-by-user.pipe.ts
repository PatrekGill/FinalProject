import { Pipe, PipeTransform } from '@angular/core';
import { Business } from '../models/business';
import { User } from '../models/user';

@Pipe({
  name: 'filterBusinessesByUser'
})
export class FilterBusinessesByUserPipe implements PipeTransform {

  transform(businesses: Business[], doFilter: boolean, user:User): Business[] {
    let filtered: Business[] = [];

    if (doFilter) {
      const userId = user.id;
      businesses.forEach(
        (business) => {
          if (!doFilter || business.user?.id === userId) {
            filtered.push(business);
          }
        }
      );

    } else {
      filtered = businesses;
    }

    return filtered;
  }

}
