import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Constant } from '../../constants/constant';

@Injectable()
export class AuthCookieService {

    constructor(private cookieService: CookieService) {}

    public clearAllCookies(): void {
      this.cookieService.remove(Constant.USER_ID_COOKIE);
      this.cookieService.remove(Constant.USER_NAME_COOKIE);
      this.cookieService.remove(Constant.USER_EMAIL_COOKIE);
      this.cookieService.remove(Constant.USER_ACCESS_TOKEN_COOKIE);
    }

    public getCookie(cookieName: string): any {
        return this.cookieService.get(cookieName);
    }

    public setCookie(cookieName: string, cookieValue: string): void {
        this.cookieService.put(cookieName, cookieValue, { expires: this.getExpireDate()});
    }

    private getExpireDate(): Date {
        const d = new Date();
        d.setDate(d.getDate() + Constant.COOKIE_EXPIRE_DAY);
        return d;
    }

}
