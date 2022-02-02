import { Pipe, PipeTransform } from '@angular/core';
import { Business } from './models/business';

@Pipe({
  name: 'searchByBusinessName'
})
export class SearchByBusinessNamePipe implements PipeTransform {

  transform(businesses: Business[], text: string): Business[] {
    let listOfBusinesses: Business[] = [];
    if (text === "") {
      listOfBusinesses = businesses;
    } else {
      businesses.forEach(
        (business) => {
          if (business.name?.toLowerCase().includes(text)) {
            listOfBusinesses.push(business);
          }
        }
      );

    }

    return listOfBusinesses;
  }

}
