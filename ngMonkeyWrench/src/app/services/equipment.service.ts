import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private url = environment.baseUrl + 'api/equipment';

  constructor(
    private http: HttpClient
  ) { }

  getEquipmentByAddressId(id: number): Observable<Equipment[]>{
    return this.http.get<Equipment[]>(this.url + "/" + id)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentService.getEquipmentByAddressId(): failed to get equipment " + error
          )
        )
      })
    );
  }

  createEquipment(equip: Equipment): Observable<Equipment>{
    return this.http.post<Equipment>(this.url, equip)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentService.createEquipment(): error creating equipment" + error
          )
        )
      })
    );
  }

  updateEquipment(equip: Equipment): Observable<Equipment> {
    return this.http.put<Equipment>(this.url + "/" + equip.id, equip).pipe(
      catchError( (error: any) => {
        console.error("EquipmentService.updateEquipment(): error updating equipment");
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentService.updateEquipment(): error updating equipment"
          )
        )
      }
    ));
  }

  destroyEquipment(equipId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${equipId}`).pipe(
      catchError( (error: any) => {
        console.error("EquipmentService.destroyEquipment(): error deleting equipment");
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentService.destroyEquipment(): error deleting equipment"
          )
        )
      })
    )
  }





}
