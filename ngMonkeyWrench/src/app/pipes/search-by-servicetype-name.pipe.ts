import { Pipe, PipeTransform } from '@angular/core';
import { ServiceType } from '../models/service-type';

@Pipe({
  name: 'searchByServicetypeName'
})
export class SearchByServicetypeNamePipe implements PipeTransform {

  transform(serviceTypes: ServiceType[], filterText: string): ServiceType[] {
    let serviceTypesFiltered: ServiceType[] = [];
    serviceTypes.forEach(
      (type) => {
        if (type.name?.toLowerCase().includes(filterText)) {
          serviceTypesFiltered.push(type);
        }

      }
    )
    return serviceTypesFiltered;

  }

}
