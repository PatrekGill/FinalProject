import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCall } from '../models/service-call';

@Pipe({
  name: 'activeCalls'
})
export class ActiveCallsPipe implements PipeTransform {

  transform(serviceCalls: ServiceCall[], showAll?: boolean): ServiceCall[] {
    const results : ServiceCall[] = [];
    if(showAll) {
      return serviceCalls;
    }

    serviceCalls.forEach((call) => {
      if(!call.completed){
        results.push(call);
      }
    });
    return results;
  }

}
