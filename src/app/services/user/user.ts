import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrls } from '../../constants/apiUrl';
import { User, Login } from '../../constants/interfaces/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(apiUrls.USER_REGISTER, user);
  }

  public login(user: Login): Observable<any> {
    return this.http.post(apiUrls.USER_LOGIN, user);
  }

}
