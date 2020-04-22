import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { EffectsModule } from '@ngrx/effects';

// Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app.routes';

// Services
import { CalculateService } from 'src/app/services/calculation/calculate-service';
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';

// Dev Only, Remove in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([CalDataEffects])
  ],
  providers: [
    CalculateService,
    CalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
