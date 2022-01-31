import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCall } from '../models/service-call';

@Pipe({
  name: 'callFilter'
})
export class CallFilterPipe implements PipeTransform {

  transform(calls: ServiceCall[], filterBy:string = "all"): ServiceCall[] {
    if(filterBy == "all"){
      return calls;
    }
    else if(filterBy == "month"){
      return calls;
    }
    else if(filterBy == "week"){
      return calls;
    }
    else if(filterBy == "day"){
      return calls;
    }
    else{
      return calls;
    }
  }

}
