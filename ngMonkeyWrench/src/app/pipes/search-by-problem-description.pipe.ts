import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../models/problem';

@Pipe({
  name: 'searchByProblemDescription'
})
export class SearchByProblemDescriptionPipe implements PipeTransform {

  transform(problems: Problem[], searchText: string): Problem[] {
    const listOfProblems: Problem[] = [];
    problems.forEach(
      (problem) => {
        if (problem.description?.toLowerCase().includes(searchText)) {
          listOfProblems.push(problem);
        }
      }
    )

    return listOfProblems;
  }

}
