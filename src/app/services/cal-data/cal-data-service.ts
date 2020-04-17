
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';



@Injectable()
export class CalDataService {

    constructor(private http: HttpClient) {}

    // TODO:: make this into a get All projection snapshot by userId
    public get(): Observable<any> {
        return of({});
        // return this.http.get('../../../assets/mock/ken-copper.json');
        // return this.http.get('../../../assets/mock/ken-hd.json');
    }

    // TODO:: replace by updateProjectionById
    public update(content: CalData): Observable<CalData> {
        return of({});
    }



    public getSnapshotsByUserId(userId: string): Observable<any> {
        return this.http.get('../../../assets/mock/snapshot.json');
    }

    public getProjectionById(id: string): Observable<CalData> {
        return this.http.get('../../../assets/mock/ken-hd.json');
    }

    public updateProjection(content: CalData): Observable<CalData> {
        return of({});
    }

}
