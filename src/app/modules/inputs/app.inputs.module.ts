import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// Components and Containers
import { QuickInputComponentComponent } from './components/quick-input-component/quick-input-component.component';
import { PeriodicItemComponentComponent } from './components/periodic-item-component/periodic-item-component.component';
import { ConstantItemComponentComponent } from './components/constant-item-component/constant-item-component.component';
import { InputContainerComponent } from './containers/input-container.component';

// Services
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { CalculateService } from '../../services/calculation/calculate-service';



@NgModule({
    declarations: [
        QuickInputComponentComponent,
        PeriodicItemComponentComponent,
        ConstantItemComponentComponent,
        InputContainerComponent
    ],
    imports: [
        BrowserModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forFeature([CalDataEffects])
    ],
    providers: [
        CalDataService,
        CalculateService
    ],
    exports: [
        InputContainerComponent
    ]
})
export class InputsModule { }
