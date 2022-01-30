import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userBusinesses'
})
export class UserBusinessesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
