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
      calls.forEach(call => {
        if(call.dateScheduled){
          if(new Date(call.dateScheduled).getMonth() === month){
            filteredCalls.push(call);
          }
        }
        });
      return filteredCalls;
    }
    else if(filterBy == "week"){
      //Calculate low and high range as iterating through service calls
      let delta = 1000 * 60 * 60 * 84;
      let threeDaysPrior = date.getTime() - delta;
      let threeDaysFuture = date.getTime() + delta;
      let filteredCalls: ServiceCall[] = [];
      calls.forEach(call => {
        if(call.dateScheduled){
          if(new Date(call.dateScheduled).getTime() > threeDaysPrior && new Date(call.dateScheduled).getTime() < threeDaysFuture){
            filteredCalls.push(call);
        }
      }
    });
      return filteredCalls;
  }
    else if(filterBy == "day"){
      let filteredCalls: ServiceCall[] = [];
      calls.forEach(call =>{
        if(call.dateScheduled){
          if(new Date(call.dateScheduled).getDay() === day){
            filteredCalls.push(call);
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
