import { Pipe, PipeTransform } from '@angular/core';
import { ServiceCall } from '../models/service-call';

@Pipe({
  name: 'callFilter'
})
export class CallFilterPipe implements PipeTransform {

  transform(calls: ServiceCall[], filterBy:string): ServiceCall[] {
    let date = new Date();
    let month = date.getMonth();
    let day = date.getDay();

    if(filterBy == "all"){
      return calls;
    }
    else if(filterBy == "month"){
      let filteredCalls: ServiceCall[] = [];
      calls.forEach(ServiceCall => {
        if(ServiceCall.dateScheduled){
          if(new Date(ServiceCall.dateScheduled).getMonth() === month){
            filteredCalls.push(ServiceCall);
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
      calls.forEach(ServiceCall =>{
        if(ServiceCall.dateScheduled){
          if(new Date(ServiceCall.dateScheduled).getDay() === day){
            filteredCalls.push(ServiceCall);
          }
        }
      })
      return filteredCalls;
    }
    else{
      return calls;
    }
  }

}
