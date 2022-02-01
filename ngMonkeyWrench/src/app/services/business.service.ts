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
  ) {

  }

  getBusinessesByUserId(userId : number): Observable<Business[]>{
    return this.http.get<Business[]>(this.url + "/user/" + userId).pipe(
      catchError( (error: any) => {
        console.error("BusinessService.getBusinessesByUserId(): failed to get businesses");
        return throwError(() => new Error("BusinessService.getBusinessesByUserId(): failed to get businesses"))
      })
    )
  }

  getAll(): Observable<Business[]> {
    return this.http.get<Business[]>(this.url).pipe(
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

  create(business:Business, onCreate: Function) {
    this.authService.doWithLoggedInUser(
      (user: User) => {
        business.user = user;
        const httpOptions = this.authService.getBasicHttpOptions();

        const post =  this.http.post<Business>(this.url, business, httpOptions)
        .pipe(
          catchError((err: any) => {
            console.error(err);
            return throwError(() => 'Business creation error');
          })
        ).subscribe(
          {
            next: () => {
              onCreate()
            }
          }
        )

        return post;
      },
      true
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


	update(edited: Business, onUpdate: Function) {
		const httpOptions = this.authService.getBasicHttpOptions();
		return this.http.put<Business>(this.url + `/${edited.id}`, edited, httpOptions)
		  .pipe(
			  catchError((err: any) => {
					console.error(err);
					return throwError(() => 'Business update error');
				})
		  ).subscribe(
        {
          next: () => {
            onUpdate();
          },
          error: (errorFound) => {
            console.log("BusinessService: update(): Error");
            console.error(errorFound);
          }
        }
      )
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
