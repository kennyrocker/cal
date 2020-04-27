import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
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
    
    private ids;
    private preLoadProjectionSub: Subscription;
    private projectionSub: Subscription;
    private routeSub: Subscription;

    public compares = [];

    constructor(private route: ActivatedRoute,
                private store: Store<reducerRoot.CalDataState>) {
    }

    ngOnInit() {

        this.routeSub = this.route.params.subscribe(params => {
            if (params['ids']) {
                 this.ids = this.deserializeIds(params['ids']);
            }
        });

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
        });
    }

    ngOnDestroy() {
        this.preLoadProjectionSub.unsubscribe();
        this.projectionSub.unsubscribe();
        this.routeSub.unsubscribe();
    }

    // performance boost
    public trackByItem(index, item): any {
        return item ? item.id : undefined;
    }

    private deserializeIds(paramIds: string): any {
        const ids: string[] = paramIds.split("&");
        const obj = {};
        ids.forEach(i => {
            obj[i.toString()] = false; 
        })
        return obj;        
    }

}
