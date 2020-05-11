import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'time'
})
export class FormateTimePipe implements PipeTransform {

    transform(timeStamp: number): any {
      return this.longAgo(timeStamp);
    }

    private formateTime(ts: number): any {
        const a = new Date(ts);
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

    private longAgo(ts: number): string {
        let curr = new Date().getTime();
        let ms_Min = 60 * 1000; // milliseconds in Minute 
        let ms_Hour = ms_Min * 60; // milliseconds in Hour 
        let ms_Day = ms_Hour * 24; // milliseconds in day 
        let ms_Mon = ms_Day * 30; // milliseconds in Month 
        let ms_Yr = ms_Day * 365; // milliseconds in Year 
        let diff = curr - ts; //difference between dates. 
        // If the diff is less then milliseconds in a minute 
        if (diff < ms_Min) { 
            return Math.round(diff / 1000) + ' seconds ago';
            // If the diff is less then milliseconds in a Hour 
        } else if (diff < ms_Hour) { 
            return Math.round(diff / ms_Min) + ' minutes ago';
            // If the diff is less then milliseconds in a day 
        } else if (diff < ms_Day) { 
            return Math.round(diff / ms_Hour) + ' hours ago'; 
            // If the diff is less then milliseconds in a Month 
        } else if (diff < ms_Mon) { 
            return Math.round(diff / ms_Day) + ' days ago'; 
            // If the diff is less then milliseconds in a year 
        } else if (diff < ms_Yr) { 
            return Math.round(diff / ms_Mon) + ' months ago'; 
        } else { 
            return Math.round(diff / ms_Yr) + ' years ago'; 
        }
    }
}
