import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Components and Containers
import { QuickInputComponentComponent } from './components/quick-input-component/quick-input-component.component';
import { ItemComponentComponent } from './components/item-component/item-component.component';
import { InputContainerComponent } from './containers/input-container/input-container.component';
import { DisplayContainerComponent } from './containers/display-container/display-container.component';

// Services
import { CalDataService } from 'src/app/services/cal-data-service';
import { InputGroupComponentComponent } from './components/input-group-component/input-group-component.component';

@NgModule({
  declarations: [
    AppComponent,
    QuickInputComponentComponent,
    ItemComponentComponent,
    InputContainerComponent,
    DisplayContainerComponent,
    InputGroupComponentComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    CalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
