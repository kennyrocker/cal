import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderContainerComponent } from './container/header-container';

@NgModule({
    declarations: [
        HeaderContainerComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        HeaderContainerComponent
    ]
})
export class HeaderModule {}