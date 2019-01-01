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

// Services
import { CalDataService } from 'src/app/services/cal-data-service';
import { InputGroupComponentComponent } from './components/input-group-component/input-group-component.component';

// Dev Only, Remove in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ConstantItemComponentComponent } from './components/constant-item-component/constant-item-component.component';

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
    })
  ],
  providers: [
    CalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
