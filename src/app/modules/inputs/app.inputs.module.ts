import { CommonModule } from '@angular/common';
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


@NgModule({
    declarations: [
        QuickInputComponentComponent,
        PeriodicItemComponentComponent,
        ConstantItemComponentComponent,
        InputContainerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects])
    ],
    exports: [
        InputContainerComponent
    ]
})
export class InputsModule { }
