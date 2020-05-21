import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderContainerComponent } from './containers/header-container';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/app.share.module';
import { SigninContainer } from './containers/signin/signin-container';
import { SignupContainer } from './containers/signup/signup-container';

@NgModule({
    declarations: [
        HeaderContainerComponent,
        SigninContainer,
        SignupContainer
    ],
    imports: [
        CommonModule,
        RouterModule,
        ShareModule
    ],
    exports: [
        HeaderContainerComponent
    ]
})
export class HeaderModule {}