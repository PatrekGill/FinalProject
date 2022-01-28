import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';
import { EquipmentType } from '../models/equipment-type';

@Injectable({
  providedIn: 'root'
})
export class EquipmentTypeService {

  private url = environment.baseUrl + 'api/type';

  constructor(
    private http: HttpClient
  ) { }

  getEquipmentTypes(): Observable<EquipmentType[]>{
    return this.http.get<EquipmentType[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentTypeService.getEquipmentType(): failed to get equipment types " + error
          )
        )
      })
    );
  }

  createEquipmentType(equipType: EquipmentType): Observable<EquipmentType>{
    return this.http.post<EquipmentType>(this.url, equipType)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentTypeService.createEquipmentType(): error creating equipment type" + error
          )
        )
      })
    );
  }

  updateEquipmentType(equipType: EquipmentType): Observable<EquipmentType> {
    return this.http.put<EquipmentType>(this.url + "/" + equipType.id, equipType).pipe(
      catchError( (error: any) => {
        console.error("EquipmentTypeService.updateEquipmentType(): error updating equipment type");
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentTypeService.updateEquipmentType(): error updating equipment type"
          )
        )
      }
    ));
  }

  destroyEquipmentType(equipTypeId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${equipTypeId}`).pipe(
      catchError( (error: any) => {
        console.error("EquipmentTypeService.destroyEquipmentType(): error deleting equipment type");
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentTypeService.destroyEquipmentType(): error deleting equipment type"
          )
        )
      })
    )
  }

}
