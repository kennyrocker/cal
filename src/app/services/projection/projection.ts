import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { apiUrls } from '../../constants/apiUrl';
import { AuthCookieService } from '../auth/authCookie';
import { Constant } from '../../constants/constant';

@Injectable()
export class Projection {

    constructor(private http: HttpClient, private tokenService: AuthCookieService) {}

    private header = () => ({
      headers: new HttpHeaders().set('Authorization', `bearer ${this.tokenService.getCookie(Constant.USER_ACCESS_TOKEN_COOKIE)}`)
    })

    // GET
    public getSnapshotsByUserId(userId: string): Observable<any> {
        return this.http.get(apiUrls.GET_SNAP_SHOT(userId), this.header());
    }
    // GET
    public getProjectionById(projectionId: string): Observable<any> {
        return this.http.get(apiUrls.GET_PROJECTION(projectionId), this.header());
    }
    // GET
    public getProjectionBatchByIds(projectionIds: string[]): Observable<any> {
        const requestBody = { ids: projectionIds };
        return this.http.post(apiUrls.GET_PROJECTION_BATCH, requestBody, this.header());
    }
    // POST
    public postProjection(userId: string, projection: any): Observable<any> {
        projection.userId = userId;
        return this.http.post(apiUrls.POST_PROJECTION, projection, this.header());
    }
    // UPDATE
    public updateProjection(projection: CalData): Observable<CalData> {
        return this.http.put(apiUrls.UPDATE_PROJECTION(projection.id), projection, this.header());
    }
    // DELETE
    public deleteProjection(projectionId: string): Observable<any> {
        return this.http.delete(apiUrls.DELETE_PROJECTION(projectionId), this.header());
    }

}
