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

// 3d Party
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
    declarations: [
        ProjectionContainerComponent
    ],
    imports: [
        CommonModule,
        DisplayModule,
        InputsModule,
        NgxChartsModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects])
    ]
})
export class ProjectionModule { }
