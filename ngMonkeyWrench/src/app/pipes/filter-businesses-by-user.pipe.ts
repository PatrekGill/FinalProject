import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterBusinessesByUser'
})
export class FilterBusinessesByUserPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
