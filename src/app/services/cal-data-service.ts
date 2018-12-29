
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class CalDataService {
    constructor() {}

    public get(): Observable<any> {
        return of({'shit': true});
    }

    public update(content: any): Observable<any> {
        return of({'shit': true});
    }
}
