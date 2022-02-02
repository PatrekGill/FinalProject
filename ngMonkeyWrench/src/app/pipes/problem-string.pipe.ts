import { Pipe, PipeTransform } from '@angular/core';
import { Problem } from '../models/problem';

@Pipe({
  name: 'problemString'
})
export class ProblemStringPipe implements PipeTransform {

  transform(problem: Problem): string {
    return `${problem.id} - ${problem.description}`;
  }

}
