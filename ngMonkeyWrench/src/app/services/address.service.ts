import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { EquipmentType } from '../models/equipment-type';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url = environment.baseUrl + 'api/address';

  constructor(
    private http: HttpClient
  ) { }

  getAddresses(): Observable<Address[]>{
    return this.http.get<Address[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "AddressService.getAddresses(): failed to get addresses " + error
          )
        )
      })
    );
  }

  createAddress(address: Address): Observable<Address>{
    return this.http.post<Address>(this.url, address)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "AddressService.createAddress(): error creating address" + error
          )
        )
      })
    );
  }

  updateAddress(address: Address): Observable<Address> {
    return this.http.put<Address>(this.url + "/" + address.id, address).pipe(
      catchError( (error: any) => {
        console.error("AddressService.updateAddress(): error updating address");
        console.error(error);
        return throwError(
          () => new Error(
            "AddressService.updateAddress(): error updating address"
          )
        )
      }
    ));
  }

  destroyAddress(addressId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${addressId}`).pipe(
      catchError( (error: any) => {
        console.error("AddressService.destroyAddress(): error deleting address");
        console.error(error);
        return throwError(
          () => new Error(
            "AddressService.destroyAddress(): error deleting address"
          )
        )
      })
    )
  }
}
