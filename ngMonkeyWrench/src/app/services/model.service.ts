import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Model } from '../models/model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private url = environment.baseUrl + "api/model"

  constructor(
    private http: HttpClient
  ) { }

  getModels():Observable<Model[]>{
    return this.http.get<Model[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ModelService.getModels(): failed to get models " + error
          )
        )
      })
    );
  }

  createModel(model: Model): Observable<Model>{
    return this.http.post<Model>(this.url, model)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ModelService.createModel(): error creating model" + error
          )
        )
      })
    );
  }

  updateModel(model: Model): Observable<Model> {
    return this.http.put<Model>(this.url + "/" + model.id, model).pipe(
      catchError( (error: any) => {
        console.error("ModelService.updateModel(): error updating model");
        console.error(error);
        return throwError(
          () => new Error(
            "ModelService.updateModel(): error updating model"
          )
        )
      }
    ));
  }

  destroyModel(modelId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${modelId}`).pipe(
      catchError( (error: any) => {
        console.error("ModelService.destroyModel(): error deleting model");
        console.error(error);
        return throwError(
          () => new Error(
            "ModelService.destroyModel(): error deleting model"
          )
        )
      })
    )
  }

}
