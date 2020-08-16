import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import {
  PROJECTION_POST_URL, GET_SNAP_SHOT_URL, GET_PROJECTION_URL,
  GET_PROJECTION_BATCH, DELETE_PROJECTION_URL, UPDATE_PROJECTION_URL
} from '../../constants/apiUrl';
import { TokenService } from '../auth/token';

@Injectable()
export class Projection {

    constructor(private http: HttpClient,
                private tokenService: TokenService) {}

    private header = () => ({
      headers: new HttpHeaders().set('Authorization', `bearer ${this.tokenService.getAccessToken()}`)
    })

    // GET
    public getSnapshotsByUserId(userId: string): Observable<any> {
        return this.http.get(GET_SNAP_SHOT_URL(userId), this.header());
    }
    // GET
    public getProjectionById(projectionId: string): Observable<any> {
        return this.http.get(GET_PROJECTION_URL(projectionId), this.header());
    }
    // GET
    public getProjectionBatchByIds(projectionIds: string[]): Observable<any> {
        const requestBody = { ids: projectionIds };
        return this.http.post(GET_PROJECTION_BATCH, requestBody, this.header());
    }
    // POST
    public postProjection(userId: string, projection: any): Observable<any> {
        projection.userId = userId;
        return this.http.post(PROJECTION_POST_URL, projection, this.header());
    }
    // UPDATE
    public updateProjection(projection: CalData): Observable<CalData> {
        return this.http.put(UPDATE_PROJECTION_URL(projection.id), projection, this.header());
    }
    // DELETE
    public deleteProjection(projectionId: string): Observable<any> {
        return this.http.delete(DELETE_PROJECTION_URL(projectionId), this.header());
    }

}
