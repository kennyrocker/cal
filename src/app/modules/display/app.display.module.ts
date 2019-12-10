import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// Components and Containers
import { DisplayContainerComponent } from './containers/display-container.component';

// Services
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { CalculateService } from '../../services/calculation/calculate-service';

// 3d Party
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
    declarations: [
        DisplayContainerComponent
    ],
    imports: [
        BrowserModule,
        StoreModule.forRoot(reducer),
        EffectsModule.forRoot([CalDataEffects]),
        NgxChartsModule,
        BrowserAnimationsModule
    ],
    providers: [
        CalDataService,
        CalculateService
    ],
    exports: [
        DisplayContainerComponent
    ]
})
export class DisplayModule { }
