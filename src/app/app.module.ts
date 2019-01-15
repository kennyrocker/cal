import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';

// Components and Containers
import { QuickInputComponentComponent } from './components/quick-input-component/quick-input-component.component';
import { PeriodicItemComponentComponent } from './components/periodic-item-component/periodic-item-component.component';
import { InputContainerComponent } from './containers/input-container/input-container.component';
import { DisplayContainerComponent } from './containers/display-container/display-container.component';
import { InputGroupComponentComponent } from './components/input-group-component/input-group-component.component';

// Services
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { CalculateService } from './services/calculation/calculate-service';

// 3d Party
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Dev Only, Remove in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConstantItemComponentComponent } from './components/constant-item-component/constant-item-component.component';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,
    QuickInputComponentComponent,
    PeriodicItemComponentComponent,
    InputContainerComponent,
    DisplayContainerComponent,
    InputGroupComponentComponent,
    ConstantItemComponentComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([CalDataEffects]),
    NgxChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    CalDataService,
    CalculateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
