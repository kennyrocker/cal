import { NgModule } from "@angular/core";
import { LockContainer } from './lock-container';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        LockContainer
    ],
    imports: [
        CommonModule
    ],
    exports: [
        LockContainer
    ]
})
export class LockModule {}