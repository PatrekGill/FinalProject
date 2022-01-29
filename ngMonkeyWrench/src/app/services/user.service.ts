import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = environment.baseUrl + 'api/user';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getHttpOption() {
    let options = {
      headers: {
      Authorization: 'Basic ' + this.authService.getCredentials(),
      'X-Requested-With': 'XMLHttpRequest'
      }
    };
  return options
  }


  index(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
            new Error('UserService.index(): error retrieving user list: ' + err)
          );
        })
      );
  }

  show(userId: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + userId).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error(
            'UserService.getUser(): error retrieving user: ' + err
            )
          );
        })
      );
  }

  createUser(todo: User): Observable<User> {
    // todo.completed = false;
    // todo.description = '';
    return this.http.post<User>(this.url, todo, this.getHttpOption()).pipe(
      catchError((err: any) => {
        console.error('TodoService.create(): error creating user: ');
        console.log(err);
        return throwError(
          () => {
          'UserService.create(): error creating user: ' + err
          }
        );
      })
    );
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(this.url + "/" + user.id, user, this.getHttpOption()).pipe(
      catchError( (error: any) => {
        console.error('UserService.update(): error updating user: ');
        console.error(error);
        return throwError(
          () => new Error(
            'UserService.update(): error updating user'
          )
        );
      })
    );
  }

  destroy(userId: number): Observable<void> {
    // CAN WRITE 2 WAYS, WITH CONCAT OR BACK TICKS
    // return this.http.delete(this.url + "/" + todoId);
    return this.http.delete<void>(`${this.url}/${userId}`, this.getHttpOption()).pipe(
      catchError( (error: any) => {
        console.error('UserService.destroy(): error deleting user: ');
        console.error(error);
        return throwError(
          () => new Error(
            'UserService.destroy(): error deleting user'
          )
        );
      })
    );
   }


}
