import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class FormateTimePipe implements PipeTransform {

    transform(timeStamp: number): any {
      return this.formateTime(timeStamp);
    }

    private formateTime(ts: number): any {
        const a = new Date(ts * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = a.getFullYear().toString().slice(2, 4);
        const month = months[a.getMonth()];
        const date = a.getDate();
        const hour = a.getHours();
        let min: any = Number(a.getMinutes());
            min = min <= 9 ? '0' + min.toString() : min.toString();
        let sec: any = Number(a.getSeconds());
            sec = sec <= 9 ? '0' + sec.toString() : sec.toString();
        const time = hour + ':' + min + ':' + sec + ', ' + month + ' ' + date + ', ' + year;
        return time;
    }
}
