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
    private authService: AuthService
  ) { }


  getBusinessesByUserId(userId : number): Observable<Business[]>{
    return this.http.get<Business[]>(this.url + "/user/" + userId).pipe(
      catchError( (error: any) => {
        console.error("BusinessService.getBusinessesByUserId(): failed to get businesses");
        return throwError(() => new Error("BusinessService.getBusinessesByUserId(): failed to get businesses"))
      })
    )
  }

  getHttpOption() {
    let options = {
      headers: {
      Authorization: 'Basic ' + this.authService.getCredentials(),
      'X-Requested-With': 'XMLHttpRequest'
      }
    };
  return options
  }

  getAll(): Observable<Business[]> {
    return this.http.get<Business[]>(this.url, this.getHttpOption()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'business getAll error');
      })
    );
  }

  show(id:string | number): Observable<Business> {
    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.get<Business>(this.url + `/${id}`,httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'index error');
      })
    );
  }

  create(business:Business) {
    this.authService.doWithLoggedInUser((user: User) => {
      business.user = user;
      const httpOptions = this.authService.getBasicHttpOptions();
      return this.http.post<Business>(this.url, business, httpOptions)
      .pipe(
        catchError((err: any) => {
          console.error(err);
          return throwError(() => 'Business creation error');
        })
      );
    })
  }

}
