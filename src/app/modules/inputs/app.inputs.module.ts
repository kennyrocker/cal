import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// Components and Containers
import { QuickInputComponent } from './components/quick-input-component/quick-input.component';
import { PeriodicItemComponent } from './components/periodic-item-component/periodic-item.component';
import { ConstantItemComponent } from './components/constant-item-component/constant-item.component';
import { InputContainerComponent } from './containers/input-container.component';
import { NameComponent } from 'src/app/modules/inputs/components/name-component/name-component';
import { ShareModule } from '../share/app.share.module';
import {UIEffects} from '../../effects/ui.effect';


@NgModule({
    declarations: [
        QuickInputComponent,
        PeriodicItemComponent,
        ConstantItemComponent,
        NameComponent,
        InputContainerComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ShareModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects, UIEffects])
    ],
    exports: [
        InputContainerComponent
    ]
})
export class InputsModule { }
