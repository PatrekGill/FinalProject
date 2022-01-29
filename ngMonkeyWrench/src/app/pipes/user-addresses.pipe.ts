import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'cluster';
import { User } from '../models/user';

@Pipe({
  name: 'userAddresses'
})
export class UserAddressesPipe implements PipeTransform {

  transform(addresses: Address[], userId: User): Address[] {
    const result: Address[] = [];

      // addresses.forEach((address) => {
      //   address.address.

      // })

    return result;
  }

}
