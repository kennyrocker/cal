import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormateTimePipe } from 'src/app/modules/share/pipes/formateTimePipe';
import { ModalContainer } from './containers/modal-container';


@NgModule({
    declarations: [
        FormateTimePipe,
        ModalContainer
    ],
    imports: [
        CommonModule
    ],
    exports: [
        FormateTimePipe,
        ModalContainer
    ]
})
export class ShareModule {}
