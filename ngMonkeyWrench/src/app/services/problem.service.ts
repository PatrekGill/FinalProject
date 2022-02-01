import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentType } from '../models/equipment-type';
import { Problem } from '../models/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {

  private url = environment.baseUrl + 'api/problem';

  constructor(
    private http: HttpClient
  ) { }

  getProblems(): Observable<Problem[]>{
    return this.http.get<Problem[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ProblemService.getProblems(): failed to get problems " + error
          )
        )
      })
    );
  }

  createProblem(problem: Problem): Observable<Problem>{
    return this.http.post<Problem>(this.url, problem)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "ProblemService.createProblem(): error creating problem" + error
          )
        )
      })
    );
  }

  updateProblem(problem: Problem): Observable<Problem> {
    return this.http.put<Problem>(this.url + "/" + problem.id, problem).pipe(
      catchError( (error: any) => {
        console.error("ProblemService.updateProblem(): error updating problem");
        console.error(error);
        return throwError(
          () => new Error(
            "EquipmentTypeService.updateEquipmentType(): error updating problem"
          )
        )
      }
    ));
  }

  destroyProblem(problemId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${problemId}`).pipe(
      catchError( (error: any) => {
        console.error("ProblemService.destroyProblem(): error deleting problem");
        console.error(error);
        return throwError(
          () => new Error(
            "ProblemService.destroyProblem(): error deleting problem"
          )
        )
      })
    )
  }

}
