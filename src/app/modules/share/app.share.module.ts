import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormateTimePipe } from 'src/app/modules/share/pipes/formateTimePipe';


@NgModule({
    declarations: [
        FormateTimePipe
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FormateTimePipe
    ]
})
export class ShareModule {}
