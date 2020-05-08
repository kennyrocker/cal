import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderContainerComponent } from './container/header-container';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        HeaderContainerComponent
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        HeaderContainerComponent
    ]
})
export class HeaderModule {}