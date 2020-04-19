import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components and Containers
import { DisplayContainerComponent } from './containers/display-container.component';


@NgModule({
    declarations: [
        DisplayContainerComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        DisplayContainerComponent
    ]
})
export class DisplayModule { }
