import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderContainerComponent } from './containers/header-container';
import { RouterModule } from '@angular/router';
import { ShareModule } from '../share/app.share.module';
import { SigninContainer } from './containers/signin/signin-container';
import { SignupContainer } from './containers/signup/signup-container';
import { ReactiveFormsModule } from '@angular/forms';

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