import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// Dev Only, Remove in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


// modules
import { DisplayModule } from 'src/app/modules/display/app.display.module';
import { InputsModule } from 'src/app/modules/inputs/app.inputs.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from 'src/app/app.routes';
import { ProjectionComponent } from 'src/app/containers/projection/projection';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    InputsModule,
    DisplayModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot( reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([CalDataEffects])
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
