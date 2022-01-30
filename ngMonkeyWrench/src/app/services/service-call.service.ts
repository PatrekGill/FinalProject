import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentType } from '../models/equipment-type';
import { ServiceCall } from '../models/service-call';

@Injectable({
  providedIn: 'root'
})
export class ServiceCallService {

  private url = environment.baseUrl + 'api/serviceCalls';

  constructor(
    private http: HttpClient
  ) { }

  getServiceCalls(): Observable<ServiceCall[]>{
    return this.http.get<ServiceCall[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCallService.getServiceCalls(): failed to get service calls " + error
          )
        )
      })
    );
  }

  createServiceCall(serviceCall: ServiceCall): Observable<ServiceCall>{
    return this.http.post<ServiceCall>(this.url, serviceCall)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCallService.createServiceCall(): error creating service call" + error
          )
        )
      })
    );
  }

  updateServiceCall(serviceCall: ServiceCall): Observable<ServiceCall> {
    return this.http.put<ServiceCall>(this.url + "/" + serviceCall.id, serviceCall).pipe(
      catchError( (error: any) => {
        console.error("ServiceCallService.updateServiceCall(): error updating service call");
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCallService.ServiceCall(): error updating service call"
          )
        )
      }
    ));
  }

  destroyServiceCall(serviceCallId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${serviceCallId}`).pipe(
      catchError( (error: any) => {
        console.error("ServiceCallService.destroyServiceCall(): error deleting service call");
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCallService.destroyServiceCall(): error deleting service call"
          )
        )
      })
    )
  }

  getServiceCallsByUserId(userId : number): Observable<ServiceCall[]>{
    return this.http.get<ServiceCall[]>(this.url + "/user/" + userId).pipe(
      catchError( (error: any) => {
        console.error("ServiceCallService.getServiceCallsByUserId(): error finding service calls");
        return throwError(() => new Error("ServiceCallService.getServiceCallsByUserId(): error finding service calls"))
      })
    )
  }
}
