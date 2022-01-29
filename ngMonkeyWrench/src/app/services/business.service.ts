import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../models/business';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  private url = environment.baseUrl + 'api/business';

  constructor(
    private http: HttpClient,
    private datePipe: DatePipe,
    private authService: AuthService
  ) { }

  handleError(error: any) {
    console.error('Error with Business Service');
    return throwError(
      () => new Error(error.json().error || 'Server Error')
    );
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

  create(business:Business) {
    const httpOptions = this.authService.getBasicHttpOptions();
    this.authService.doWithLoggedInUser((user: User) => {
      business.user = user;
      return this.http.post<Business>(this.url, business, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    })
  }
}
