import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components and Containers
import { DisplayContainerComponent } from './containers/display-container.component';

// 3d Party
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    declarations: [
        DisplayContainerComponent
    ],
    imports: [
        CommonModule,
        NgxChartsModule,
    ],
    exports: [
        DisplayContainerComponent
    ]
})
export class DisplayModule { }
