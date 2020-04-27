import { Component, OnInit, OnDestroy } from "@angular/core";

import { Store, select } from '@ngrx/store';
import * as reducerRoot from '../../../reducers/index';
import { Subscription } from 'rxjs';
import { isProjectionsExistedFromCollection, getProjectionsByIds } from 'src/app/selectors/selectors';
import { GetProjectionBatchByIdsAction } from 'src/app/actions/calData.action';
import { filter } from 'rxjs/internal/operators/filter';

@Component({
    selector: 'app-compare-container',
    templateUrl: './compare-container.component.html',
    styleUrls: ['./compare-container.component.scss']
})
export class CompareContainerComponent implements OnInit, OnDestroy {


    // mocking for now
    ids = {
        '106363041': false,
        '1003023041': false
    };

    private preLoadProjectionSub: Subscription;
    private projectionSub: Subscription;

    public compares = [];

    constructor(private store: Store<reducerRoot.CalDataState>) {
    }

    ngOnInit() {

        this.preLoadProjectionSub = this.store.pipe(
            select(isProjectionsExistedFromCollection, {ids: this.ids})
        ).subscribe((notLoaded) => {
            if (notLoaded && Object.keys(notLoaded).length > 0) {
                const ids = [];
                for(const id in notLoaded) {
                    ids.push(id);
                }
                this.store.dispatch(new GetProjectionBatchByIdsAction(ids));
            }
        });

        this.projectionSub = this.store.pipe(
            select(getProjectionsByIds, {ids: this.ids}),
            filter(collection => (collection !== undefined  && collection.length > 0))
        ).subscribe((collection) => {
            this.compares = collection;
            console.log('compare data :: ' ,this.compares);
        });
    }

    ngOnDestroy() {
        this.preLoadProjectionSub.unsubscribe();
        this.projectionSub.unsubscribe();
    }

    // performance boost
    public trackByItem(index, item): any {
        return item ? item.id : undefined;
    }

}
