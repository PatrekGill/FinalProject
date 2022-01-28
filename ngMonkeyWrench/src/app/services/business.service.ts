import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../models/business';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private url = environment.baseUrl + 'api/business';

  constructor(
    private http: HttpClient
  ) { }

  getAll(): Observable<Business[]> {
    return this.http.get<Business[]>(this.url)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'business getAll error');
      })
    );
  }

  show(id:string | number): Observable<Business> {
    return this.http.get<Business>(this.url + "/" + id)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'index error');
      })
    );
  }
}
