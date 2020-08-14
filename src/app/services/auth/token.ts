import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Constant } from '../../constants/constant';

@Injectable()
export class TokenService {

    constructor(private cookieService: CookieService) {}

    public getAccessToken(): any {
      return this.cookieService.get(Constant.ACCESS_TOKEN);
    }

    public setAccessToken(token: string): void {
      this.cookieService.put(Constant.ACCESS_TOKEN, token);
    }

    public clearTokens(): void {
      this.cookieService.remove(Constant.ACCESS_TOKEN);
    }

}
