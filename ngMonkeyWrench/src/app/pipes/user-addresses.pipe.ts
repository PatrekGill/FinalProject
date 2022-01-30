import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAddresses'
})
export class UserAddressesPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
