import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByBusinessName'
})
export class SearchByBusinessNamePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
