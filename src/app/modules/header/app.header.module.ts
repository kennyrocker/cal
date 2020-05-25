import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderContainerComponent } from './containers/header-container';
import { RouterModule } from '@angular/router';
import { SigninContainer } from './containers/signin/signin-container';
import { SignupContainer } from './containers/signup/signup-container';
import { ReactiveFormsModule } from '@angular/forms';
import { ShareModule } from '../share/app.share.module';

@NgModule({
    declarations: [
        HeaderContainerComponent,
        SignupContainer,
        SigninContainer
    ],
    imports: [
        CommonModule,
        RouterModule,
        ShareModule,
        ReactiveFormsModule
    ],
    exports: [
        HeaderContainerComponent
    ]
})
export class HeaderModule {}