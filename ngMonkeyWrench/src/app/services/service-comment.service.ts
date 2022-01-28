import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ServiceComment } from '../models/service-comment';

@Injectable({
  providedIn: 'root'
})
export class ServiceCommentService {

  private url = environment.baseUrl + 'api/servicecomment';

  constructor(
    private http: HttpClient
  ) { }

  getServiceComments(): Observable<ServiceComment[]>{
    return this.http.get<ServiceComment[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCommentService.getServiceComments(): failed to get service comments " + error
          )
        )
      })
    );
  }

  createServiceComment(serviceComment: ServiceComment): Observable<ServiceComment>{
    return this.http.post<ServiceComment>(this.url, serviceComment)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCommentService.createServiceComment(): error creating service comment" + error
          )
        )
      })
    );
  }

  updateServiceComment(serviceComment: ServiceComment): Observable<ServiceComment> {
    return this.http.put<ServiceComment>(this.url + "/" + serviceComment.id, serviceComment).pipe(
      catchError( (error: any) => {
        console.error("ServiceCommentService.updateServiceComment(): error updating service comment");
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCommentService.updateServiceComment(): error updating service comment"
          )
        )
      }
    ));
  }

  destroyServiceComment(serviceCommentId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${serviceCommentId}`).pipe(
      catchError( (error: any) => {
        console.error("ServiceCommentService.destroyServiceComment(): error deleting service comment");
        console.error(error);
        return throwError(
          () => new Error(
            "ServiceCommentService.destroyServiceComment(): error deleting service comment"
          )
        )
      })
    )
  }
}
