import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../../constants/apiUrl';
import { User, Login } from '../../constants/interfaces/user';

@Injectable()
export class UserService {

  constructor(private http: HttpClient) {}

  public register(user: User): Observable<any> {
    return this.http.post(USER_REGISTER_URL, user);
  }

  public login(user: Login): Observable<any> {
    return this.http.post(USER_LOGIN_URL, user);
  }

}
