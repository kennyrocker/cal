import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as reducerRoot from './reducers';
import { isSampleLoaded } from './selectors/selectors';
import { TemplateGetSampleAction } from './actions/calData.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    private fetchSampleSub: Subscription;
    private lang = 'en'; // TODO:: pick from browser lang || user selection

    constructor(public store: Store<reducerRoot.CalDataState>) {}

    ngOnInit() {
      this.fetchSampleSub = this.store.select(isSampleLoaded)
        .subscribe( sampleLoaded => {
          if (!sampleLoaded) this.store.dispatch(new TemplateGetSampleAction(this.lang));
        });
    }

    ngOnDestroy() {
      this.fetchSampleSub.unsubscribe();
    }

}
