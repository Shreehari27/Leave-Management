import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusPipe',
  standalone: true
})
export class StatusPipe implements PipeTransform {

  transform(value: string): string {
    return (value ?? ' ').toUpperCase();
  }

}
