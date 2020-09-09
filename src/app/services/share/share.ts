import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../../constants/constant';
import { AuthCookieService } from '../auth/authCookie';
import { apiUrls } from '../../constants/apiUrl';

@Injectable()
export class Share {

    constructor(private http: HttpClient, private tokenService: AuthCookieService) {}

    private header = () => ({
      headers: new HttpHeaders().set('Authorization', `bearer ${this.tokenService.getCookie(Constant.USER_ACCESS_TOKEN_COOKIE)}`)
    })

    public postShareProjection(projectionId: string): Observable<any> {
        const requestBody = { projectionId: projectionId };
        return this.http.post(apiUrls.POST_SHARE_PROJECTION(), requestBody, this.header());
    }
}
