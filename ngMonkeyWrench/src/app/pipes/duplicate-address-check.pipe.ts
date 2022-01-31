import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'duplicateAddressCheck'
})
export class DuplicateAddressCheckPipe implements PipeTransform {


  transform(addresses: Address[], checkAddy: Address): boolean {
    let goodAddress = true;

    addresses.forEach((address) => {
      if(address.street2 == null){
        address.street2 = '';
      }
      if(address.notes == null){
        address.notes = '';
      }

      if(checkAddy.street.toLowerCase() === address.street.toLowerCase()
        && checkAddy.street2.toLowerCase() === address.street2.toLowerCase()
        && checkAddy.city.toLowerCase() === address.city.toLowerCase()
        && checkAddy.stateAbbv === address.stateAbbv
        && checkAddy.zipCode === address.zipCode
        ) {
          goodAddress = false;
        }
      });

    return goodAddress;
  }

}
