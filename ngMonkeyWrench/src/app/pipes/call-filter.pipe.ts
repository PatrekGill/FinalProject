import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCall } from '../models/service-call';

@Pipe({
  name: 'callFilter'
})
export class CallFilterPipe implements PipeTransform {

  transform(calls: ServiceCall[], filterBy:string): ServiceCall[] {
    let date = new Date();
    console.log(date.getMonth());
    console.log("why don't you like me")
    let month = date.getMonth();


    if(filterBy == "all"){
      return calls;
    }
    else if(filterBy == "month"){
      let filteredCalls: ServiceCall[] = [];
      calls.forEach(ServiceCall => {
        if(ServiceCall.dateScheduled){
          console.log(new Date(ServiceCall.dateScheduled));
          if(new Date(ServiceCall.dateScheduled).getMonth() === month){
            filteredCalls.push(ServiceCall);
            console.log("is this working?")
          }
        }
        });
      return filteredCalls;
    }
    else if(filterBy == "week"){
      let filteredCalls: ServiceCall[] = [];
      return filteredCalls;
    }
    else if(filterBy == "day"){
      let filteredCalls: ServiceCall[] = [];
      return filteredCalls;
    }
    else{
      return calls;
    }
  }

}
