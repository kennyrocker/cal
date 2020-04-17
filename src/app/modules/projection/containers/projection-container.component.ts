import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as reducerRoot from '../../../reducers/index';
import { filter, map } from 'rxjs/operators';
import { select } from '@ngrx/store';
import { getSnapShotByIdisLoaded, getProjectionById } from 'src/app/selectors/selectors';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { GetProjectionByIdAction } from 'src/app/actions/calData.action';

@Component({
    selector: 'app-projection-container',
    templateUrl: './projection-container.component.html',
    styleUrls: ['./projection-container.component.scss']
})
export class ProjectionContainerComponent implements OnInit, OnDestroy {

    private projectionId: string;
    private routeSub: Subscription;
    private isLoadedSub: Subscription;
    private projectionSub: Subscription;

    constructor(private route: ActivatedRoute,
        public store: Store<reducerRoot.CalDataState>) {

    }

    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            this.projectionId = params['id'];
        });

        this.isLoadedSub = this.store.pipe(
            select(getSnapShotByIdisLoaded, {id:  this.projectionId})
        ).subscribe((isLoaded) => {
            if (!isLoaded) {
                this.store.dispatch(new GetProjectionByIdAction(this.projectionId));
            }
        });

        this.projectionSub = this.store.pipe(
            select(getProjectionById, {id: this.projectionId}),
        ).subscribe( data => {
            console.log(data);
        });




        // TODO::
        // base of projectionId
        // check if projection data existed from store
        // if not dispatch getProjectionById with id
        // subscribe to the particular projection data from store
        // feed the data to input and display componet (module need to rewrite to accept input, and change action dispatch)

    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.isLoadedSub.unsubscribe();
        this.projectionSub.unsubscribe();
    }

}
