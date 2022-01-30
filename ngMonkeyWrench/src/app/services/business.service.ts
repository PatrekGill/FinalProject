import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Business } from '../models/business';
import { ServiceType } from '../models/service-type';
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
    return this.http.get<Business>(this.url + `/${id}`,httpOptions)
    .pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => 'business show error');
      })
    );
  }

  create(business:Business) {
    this.authService.doWithLoggedInUser(
      (user: User) => {
        business.user = user;
        const httpOptions = this.authService.getBasicHttpOptions();

        return this.http.post<Business>(this.url, business, httpOptions)
        .pipe(
          catchError((err: any) => {
            console.error(err);
            return throwError(() => 'Business creation error');
          })
        );

      }
    )
  }

  destroy(id: number | string) {
    const httpOptions = this.authService.getBasicHttpOptions();
    return this.http.delete<Business>(this.url + `/${id}`, httpOptions)
    .pipe(
      catchError((err: any) => {
        console.error(err);
        return throwError(() => 'Business destroy error');
      })
    );
  }


	update(edited: Business) {
		const httpOptions = this.authService.getBasicHttpOptions();
		return this.http.put<Business>(this.url + `/${edited.id}`, edited, httpOptions)
		  .pipe(
			  catchError((err: any) => {
					console.error(err);
					return throwError(() => 'Business update error');
				})
		  );
  }


  addServiceType(item: ServiceType | ServiceType[], business: Business) {
    const httpOptions = this.authService.getBasicHttpOptions();
    if (!business.serviceTypes) {
      business.serviceTypes = [];
    }

    if (Array.isArray(item)) {
      business.serviceTypes.push(...item);

    } else {
      business.serviceTypes.push(item);

    }

		return this.http.put<Business>(this.url + `/${business.id}`, business, httpOptions)
		  .pipe(
			  catchError((err: any) => {
					console.error(err);
					return throwError(() => 'Business addServiceType error');
				})
		  );
  }


  addUser(item: User | User[], business: Business) {
    const httpOptions = this.authService.getBasicHttpOptions();
    if (!business.users) {
      business.users = [];
    }

    if (Array.isArray(item)) {
      business.users.push(...item);

    } else {
      business.users.push(item);

    }

		return this.http.put<Business>(this.url + `/${business.id}`, business, httpOptions)
		  .pipe(
			  catchError((err: any) => {
					console.error(err);
					return throwError(() => 'Business addUser error');
				})
		  );
  }
}
