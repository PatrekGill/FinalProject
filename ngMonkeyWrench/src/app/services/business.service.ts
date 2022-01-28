import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../models/business';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private url = environment.baseUrl + 'api/business';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    console.log("Test");
    authService.login("johndoe","johndoe");
  }

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
    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.get<Business>(this.url + "/" + id,httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'index error');
      })
    );
  }

  handleError(error: any) {
    console.error('error with business service');
    return throwError(
      () => new Error(error.json().error || 'Server Error')
    );
  }


  create(business:Business) {

    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.post<Business>(this.url, business, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  update(editedBusiness:Business) {
    if (editedBusiness === undefined) {
      return;
    }

    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.put<Business>(this.url + `/${editedBusiness.id}`, editedBusiness, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  destroy(id?: number) {
    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.delete<Business>(this.url + `/${id}`, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
}
