import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Address } from '../models/address';
import { EquipmentType } from '../models/equipment-type';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private url = environment.baseUrl + 'api/address';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHttpOption() {
    let options = {
      headers: {
      Authorization: 'Basic ' + this.authService.getCredentials(),
      'X-Requested-With': 'XMLHttpRequest'
      }
    };
  return options
  }

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
    return this.http.post<Address>(this.url, address, this.getHttpOption())
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
    return this.http.put<Address>(this.url + "/" + address.id, address, this.getHttpOption()).pipe(
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

  getAddressByUserId(userId: number): Observable<Address[]>{
    // return this.http.get<Address[]>(`${this.url}/user/${userId}`).pipe(
      console.log('in addyservice');
      console.log('userID is' + userId);


    return this.http.get<Address[]>(this.url + '/user/' + userId)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "AddressService.getAddressByUserId(): failed to get addresses by UserId " + error
          )
        )
      })
    );
  }

}
