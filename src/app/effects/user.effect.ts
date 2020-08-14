import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../services/user/user';
import { Observable } from 'rxjs/internal/Observable';
import { Action } from '@ngrx/store';
import {
  CalDataActionTypes, PostUserAction, PostUserLoginAction,
  PostUserSuccessAction, UpdateUserAction, UserLogOutAction
} from '../actions/calData.action';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TokenService } from '../services/auth/token';

@Injectable()
export class UserEffects {

    constructor(private actions$: Actions,
                private userService: UserService,
                private tokenService: TokenService) {}

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
                        this.tokenService.setAccessToken(res.token);
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
           this.tokenService.clearTokens();
           return new UpdateUserAction({ id: null, email: null, userName: null });
        })
    );

}
