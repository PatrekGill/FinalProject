import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EquipmentType } from '../models/equipment-type';
import { Solution } from '../models/solution';

@Injectable({
  providedIn: 'root'
})
export class SolutionService {

  private url = environment.baseUrl + 'api/solution';

  constructor(
    private http: HttpClient
  ) { }

  getSolutions(): Observable<Solution[]>{
    return this.http.get<Solution[]>(this.url)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "SolutionService.getSolutions(): failed to get solutions " + error
          )
        )
      })
    );
  }

  createSolution(solution: Solution): Observable<Solution>{
    return this.http.post<Solution>(this.url, solution)
    .pipe(
      catchError( (error: any) => {
        console.error(error);
        return throwError(
          () => new Error(
            "SolutionService.createSolution(): error creating solution" + error
          )
        )
      })
    );
  }

  updateSolution(solution: Solution): Observable<Solution> {
    return this.http.put<Solution>(this.url + "/" + solution.id, solution).pipe(
      catchError( (error: any) => {
        console.error("SolutionService.updateSolution(): error updating solution");
        console.error(error);
        return throwError(
          () => new Error(
            "SolutionService.updateSolution(): error updating solution"
          )
        )
      }
    ));
  }

  destroySolution(solutionId: number): Observable<void>{
    return this.http.delete<void>(`${this.url}/${solutionId}`).pipe(
      catchError( (error: any) => {
        console.error("SolutionService.destroySolution(): error deleting solution");
        console.error(error);
        return throwError(
          () => new Error(
            "SolutionService.destroySolution(): error deleting solution"
          )
        )
      })
    )
  }
}
