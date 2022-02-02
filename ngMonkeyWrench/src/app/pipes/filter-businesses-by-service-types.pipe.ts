import { Pipe, PipeTransform } from '@angular/core';
import { Business } from '../models/business';

@Pipe({
  name: 'filterBusinessesByServiceTypes'
})
export class FilterBusinessesByServiceTypesPipe implements PipeTransform {

  transform(businesses: Business[], filterServiceTypesIds: number[], mustHaveAll: boolean): Business[] {
    let filtered: Business[] = [];

    if (filterServiceTypesIds.length < 1) {
      filtered = businesses;

    } else {
      businesses.forEach(
        (business) => {
          let passesFilter = false;

          if (business.serviceTypes) {
            // get all serviceType Ids on business
            const businessServiceTypeIds:number[] = [];
            business.serviceTypes.forEach(
              (serviceType) => {
                businessServiceTypeIds.push(serviceType.id);
              }
            );

            if (mustHaveAll) {
              passesFilter = true;
              for (let index = 0; index < filterServiceTypesIds.length; index++) {
                const id = filterServiceTypesIds[index];
                if (!businessServiceTypeIds.includes(id)) {
                  passesFilter = false;
                  break;
                }
              }


            } else {
              for (let index = 0; index < filterServiceTypesIds.length; index++) {
                const id = filterServiceTypesIds[index];
                if (businessServiceTypeIds.includes(id)) {
                  passesFilter = true;
                  break;
                }
              }
            }

          }

          if (passesFilter) {
            filtered.push(business);
          }

        }
      )
    }


    return filtered;
  }

}
