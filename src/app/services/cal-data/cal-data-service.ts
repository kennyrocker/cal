
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';



@Injectable()
export class CalDataService {

    constructor(private http: HttpClient) {}

    public getSnapshotsByUserId(userId: string): Observable<any> {
        return this.http.get('../../../assets/mock/snapshot.json');
    }

    public getProjectionById(id: string): Observable<any> {
        if (id === '1003023041') {
            return this.http.get('../../../assets/mock/ken-hd.json');
        } else if (id === '106363041') {
            return this.http.get('../../../assets/mock/ken-copper.json');
        } else {
            return of ({});
        }
    }

    public updateProjection(content: CalData): Observable<CalData> {
        return of({});
    }

}
