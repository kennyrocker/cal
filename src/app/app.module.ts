import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

// Ngrx
import { StoreModule } from '@ngrx/store';
import { reducer } from 'src/app/reducers';
import { CalDataEffects } from 'src/app/effects/calData.effect';
import { UserEffects } from './effects/user.effect';
import { UIEffects } from './effects/ui.effect';
import { EffectsModule } from '@ngrx/effects';

// Modules
import { AppComponent } from './app.component';
import { AppRoutingModule } from 'src/app/app.routes';
import { StaticModule } from 'src/app/modules/static/app.static.module';
import { HeaderModule } from './modules/header/app.header.module';
import { FooterModule } from './modules/footer/app.footer.module';

// Services
import { CalculateService } from 'src/app/services/calculation/calculate-service';
import { Projection } from 'src/app/services/projection/projection';

// 3d Party
import { NgxChartsModule } from '@swimlane/ngx-charts';

// Dev Only, Remove in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { LockModule } from './modules/lock/app-lock.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    StaticModule,
    HeaderModule,
    FooterModule,
    LockModule,
    NgxChartsModule,
    StoreModule.forRoot(reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([CalDataEffects, UserEffects, UIEffects])
  ],
  providers: [
    CalculateService,
    Projection
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
