import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// Components and Containers
import { ProjectionContainerComponent } from 'src/app/modules/projection/containers/projection-container.component';

// Services
import { InputsModule } from 'src/app/modules/inputs/app.inputs.module';
import { DisplayModule } from 'src/app/modules/display/app.display.module';

// Route
import { RouterModule, Routes } from '@angular/router';
import {UIEffects} from '../../effects/ui.effect';


const routes: Routes = [
    { path: 'projection/:id', component: ProjectionContainerComponent }
];

@NgModule({
    declarations: [
        ProjectionContainerComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        DisplayModule,
        InputsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects])
    ]
})
export class ProjectionModule { }
