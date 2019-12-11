
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';



@Injectable()
export class CalDataService {

    constructor(private http: HttpClient) {}

    public get(): Observable<any> {
        return this.http.get('../../../assets/mock/ken-copper.json');
        //return this.http.get('../../../assets/mock/ken-hd.json');
    }

    public update(content: CalData): Observable<CalData> {
        return of({});
    }
}
