import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceType } from '../models/service-type';

@Injectable({
  providedIn: 'root'
})
export class ServiceTypeService {

  private url = environment.baseUrl + 'api/servicetype';

  constructor(
    private http: HttpClient
  ) { }

  getServiceType(): Observable<ServiceType[]>{
    return this.http.get<ServiceType[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceTypeService.getServiceType(): failed to get service type " + error
          )
        )
      })
    );
  }

  getAll(): Observable<ServiceType[]> {
    return this.http.get<ServiceType[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'ServiceType getAll error');
      })
    );
  }

  createServiceType(serviceType: ServiceType): Observable<ServiceType>{
    return this.http.post<ServiceType>(this.url, serviceType)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceTypeService.createServiceType(): error creating service type" + error
          )
        )
      })
    );
  }

  updateServiceType(serviceType: ServiceType): Observable<ServiceType> {
    return this.http.put<ServiceType>(this.url + "/" + serviceType.id, serviceType).pipe(
      catchError( (error: any) => {
        console.error("ServiceTypeService.updateServiceType(): error updating service type");
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceTypeService.updateServiceType(): error updating service type"
          )
        )
      }
    ));
  }

  destroyServiceType(serviceTypeId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${serviceTypeId}`).pipe(
      catchError( (error: any) => {
        console.error("ServiceTypeService.destroyServiceType(): error deleting service type");
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceTypeService.destroyServiceType(): error deleting service type"
          )
        )
      })
    )
  }
}
