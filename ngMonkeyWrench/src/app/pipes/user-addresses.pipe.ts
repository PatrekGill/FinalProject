import { Pipe, PipeTransform } from '@angular/core';
import { Address } from '../models/address';

@Pipe({
  name: 'userAddresses'
})
export class UserAddressesPipe implements PipeTransform {

  transform(addresses: Address[], checkAddy: Address): boolean {
    let goodAddress = true;

    console.log('CHECK THIS ADDY');
    console.log(checkAddy);

    let k;
    for(k in checkAddy){
      console.log('in elements');
      // console.log(typeof k);
      console.log(k);
      console.log(Object.values(k));


      if(k === undefined){
        console.log('ELEMET IS UNDEFINED!!!!!!!');
        console.log(k);
        k = null;
      }

      // console.log('CHECK ADDY after null try');
      // console.log(checkAddy);

    }


    addresses.forEach((address) => {

      // if(Object.values(address).indexOf(undefined) > -1) {
      //   console.log('has undefined');

      // } else {
      //   console.log("NO UNDEFINED");
      //   console.log(address);

      // }

      if(checkAddy.street === address.street
        && checkAddy.street2 === address.street2
        && checkAddy.city === address.city
        && checkAddy.stateAbbv === address.stateAbbv
        // && checkAddy.zipCode === address.zipCode
        ) {
          // console.log('checkAddy');
          // console.log(checkAddy.street);
          console.log('ADDY TO CHECK');
          console.log(address);

          // console.log((checkAddy.street !== address.street));
          goodAddress = false;
        }
      });

    // console.log('goodAddy after checks: ' + goodAddress);

    return goodAddress;
  }

}
