
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';



@Injectable()
export class CalDataService {

    constructor(private http: HttpClient) {}

    // GET
    public getSnapshotsByUserId(userId: string): Observable<any> {
        return this.http.get('../../../assets/mock/snapshot.json');
    }
    // GET
    public getProjectionById(id: string): Observable<any> {
        if (id === '1003023041') {
            return this.http.get('../../../assets/mock/ken-hd.json');
        } else if (id === '106363041') {
            return this.http.get('../../../assets/mock/ken-copper.json');
        } else {
            return of ({});
        }
    }
    // GET
    public getProjectionBatchByIds(userId: string, ids: string[]): Observable<any> {
        // mocking for now
        if (ids.length === 1 && ids[0] === '1003023041') {
            return this.http.get('../../../assets/mock/batch-hd.json');
        } else if (ids.length === 1 && ids[0] === '106363041') {
            return this.http.get('../../../assets/mock/batch-cp.json');
        } else {
            return this.http.get('../../../assets/mock/batch-hd-cp.json');
        }
    }
    // POST
    public postProjection(content: CalData): Observable<CalData> {
        return of({});
    }

    // UPDATE
    public updatePorjection(userId: string, projection: CalData): Observable<CalData> {

        // MOCK backend
        // post userid and projection
        // verify data
        // save to db , update lastUpdated timestamp
        // return response with 200 and timestamp


        // MOCK 200 & timestamp
        const resTime = new Date().getTime();
        projection.lastUpdated = resTime;

        return of(projection);
    }

}
