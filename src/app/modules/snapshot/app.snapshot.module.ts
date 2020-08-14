import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';

import { ShareModule } from 'src/app/modules/share/app.share.module';

import { SnapshotContainerComponent } from 'src/app/modules/snapshot/containers/snapshot-container.component';
import {UIEffects} from '../../effects/ui.effect';


const routes: Routes = [
    { path: 'snapshot', component: SnapshotContainerComponent }
];

@NgModule({
    declarations: [
        SnapshotContainerComponent
    ],
    imports: [
        CommonModule,
        ShareModule,
        RouterModule.forChild(routes),
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects, UIEffects])
    ]
})
export class SnapshotModule {}
