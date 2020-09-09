import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UIEffects } from '../../effects/ui.effect';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { ShareModule } from 'src/app/modules/share/app.share.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SnapshotContainerComponent } from 'src/app/modules/snapshot/containers/snapshot-container.component';
import { Share } from '../../services/share/share';



const routes: Routes = [
    { path: 'snapshot', component: SnapshotContainerComponent }
];

@NgModule({
    declarations: [
        SnapshotContainerComponent
    ],
    imports: [
        CommonModule,
        FontAwesomeModule,
        ShareModule,
        RouterModule.forChild(routes),
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects, UIEffects])
    ],
    providers: [
        Share
    ]
})
export class SnapshotModule {}
