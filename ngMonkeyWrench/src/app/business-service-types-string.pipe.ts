import { Pipe, PipeTransform } from '@angular/core';
import { Business } from './models/business';

@Pipe({
  name: 'businessServiceTypesString'
})
export class BusinessServiceTypesStringPipe implements PipeTransform {

  transform(business: Business): string {
    return this.getServiceTypesAsString(business);
  }

  getServiceTypesAsString(business: Business): string {
    let serviceTypesString = "";
    console.log("here");
    if (!business.serviceTypes) {
      return serviceTypesString;
    }

    const numberOfServices = business.serviceTypes.length;
    if (numberOfServices > 0) {
      console.log("here");

      business.serviceTypes.forEach(type => {
        serviceTypesString += (type.name + ", ");
      });

      // get rid of end comma
      serviceTypesString = serviceTypesString.slice(0, serviceTypesString.length - 2);
    }

    return serviceTypesString;
  }

}
