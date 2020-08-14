import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompareContainerComponent } from './container/compare-container.component';
import { DisplayModule } from '../display/app.display.module';
import { InputsModule } from '../inputs/app.inputs.module';
import { ReactiveFormsModule } from '@angular/forms';

import { Routes, RouterModule } from '@angular/router';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';
import {UIEffects} from '../../effects/ui.effect';

const routes: Routes = [
    { path: 'compare', component: CompareContainerComponent }
];

@NgModule({
    declarations: [
        CompareContainerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DisplayModule,
        InputsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects, UIEffects])
    ]
})
export class CompareModule { }
