import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let date = new Date(value);

    let hours = date.getHours();
    let minutes = date.getMinutes();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    month++; // months and minutes are zero-indexed
    minutes++;
    if(minutes === 60) { 
      minutes = 0;
      hours ++;
    }

    let strMinutes = (minutes < 10) ? "0" + minutes : minutes; // ensure minutes are always 2 digits

    const suffix = (hours >= 12) ? 'PM' : 'AM'; //it is pm if hours from 12 onwards

    hours = (hours > 12) ? hours - 12 : hours; //only -12 from hours if it is greater than 12 (if not back at mid night)

    hours = (hours == 0) ? 12 : hours; //if 00 then it is 12 am

    return month + "/" + day + "/" + year + " " + hours + ":" + strMinutes + ' ' + suffix
  }

}
