import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';

// Dev Only, Remove in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// modules
import { DisplayModule } from 'src/app/modules/display/app.display.module';
import { InputsModule } from 'src/app/modules/inputs/app.inputs.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    InputsModule,
    DisplayModule,
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([CalDataEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
