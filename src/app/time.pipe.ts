import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'appTime'
})
export class Time implements PipeTransform {

  transform(value: any, args?: any): any {
    let dateTime = new Date(value);
    return moment(dateTime).format('HH:mm');
  }

}
