import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderContainerComponent } from './containers/header-container';
import { RouterModule } from '@angular/router';
import { SigninContainer } from './containers/signin/signin-container';
import { SignupContainer } from './containers/signup/signup-container';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/app.share.module';
import { UserService } from '../../services/user/user';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from '../../effects/user.effect';
import { AuthCookieService } from '../../services/auth/authCookie';
import { CookieModule, CookieService } from 'ngx-cookie';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
    declarations: [
        HeaderContainerComponent,
        SignupContainer,
        SigninContainer
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        ShareModule,
        ReactiveFormsModule,
        EffectsModule.forRoot([UserEffects]),
        CookieModule.forRoot()
    ],
    providers: [
        UserService,
        AuthCookieService,
        CookieService
    ],
    exports: [
        HeaderContainerComponent
    ]
})
export class HeaderModule {}
