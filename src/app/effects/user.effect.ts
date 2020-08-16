import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user/user';
import { Observable } from 'rxjs/internal/Observable';
import { Action } from '@ngrx/store';
import {
  CalDataActionTypes, PostUserAction, PostUserLoginAction,
  PostUserSuccessAction, ResetStateAction, UpdateUserAction, UserLogOutAction
} from '../actions/calData.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { AuthCookieService } from '../services/auth/authCookie';
import { Constant } from '../constants/constant';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions,
                private userService: UserService,
                private authCookieService: AuthCookieService) {}

    @Effect()
    public registerUser$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.PostUser),
        switchMap((action: PostUserAction) =>
            this.userService
              .register(action.payload)
              .pipe(
                  map((res) => {
                      return new PostUserSuccessAction(res);
                  }),
                  catchError((err) => of ({ type: CalDataActionTypes.PostUserFailed, error: err }))
              )
        )
    );


    @Effect()
    public loginUser$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.PostUserLogin),
        switchMap((action: PostUserLoginAction) =>
            this.userService
                .login(action.payload)
                .pipe(
                    map((res) => {
                        this.authCookieService.setCookie(Constant.USER_ID_COOKIE, res.user.id);
                        this.authCookieService.setCookie(Constant.USER_NAME_COOKIE, res.user.userName);
                        this.authCookieService.setCookie(Constant.USER_EMAIL_COOKIE, res.user.email);
                        this.authCookieService.setCookie(Constant.USER_ACCESS_TOKEN_COOKIE, res.token);
                        return new UpdateUserAction(res.user);
                    }),
                    catchError((err) => of ({ type: CalDataActionTypes.PostUserLoginFailed, error: err }))
                )
        )
    );


    @Effect()
    public logOutUser$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.UserLogOut),
        map((action: UserLogOutAction) => {
           this.authCookieService.clearAllCookies();
           return new ResetStateAction();
        })
    );

}
