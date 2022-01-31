import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'userAddresses'
})
export class UserAddressesPipe implements PipeTransform {

  transform(addresses: Address[], checkAddy: Address): boolean {
    let goodAddress = false;

    addresses.forEach((address) => {
      if(checkAddy.street !== address.street &&
        checkAddy.street2 !== address.street2 &&
        checkAddy.city !== address.city &&
        checkAddy.stateAbbv !== address.stateAbbv &&
        checkAddy.zipCode !== address.zipCode
        ) {
          goodAddress = true;
        }
    });
    return goodAddress;
  }

}
