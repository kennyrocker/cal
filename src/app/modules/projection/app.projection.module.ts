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
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { CalculateService } from '../../services/calculation/calculate-service';




@NgModule({
    declarations: [
        ProjectionContainerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects])
    ],
    providers: [
        CalDataService,
        CalculateService
    ]
})
export class ProjectionModule { }
