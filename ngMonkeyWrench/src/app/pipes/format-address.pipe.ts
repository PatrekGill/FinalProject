import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'formatAddress'
})
export class FormatAddressPipe implements PipeTransform {

  transform(address: Address): string {
    let addressAsString = "";

    addressAsString += address.street;
    addressAsString += (" " + address.street2);
    addressAsString += (", " + address.city);
    addressAsString += (", " + address.stateAbbv);
    addressAsString += (" " + address.zipCode);

    return addressAsString;
  }

}
