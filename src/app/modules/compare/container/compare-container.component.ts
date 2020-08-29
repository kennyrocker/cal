import { Component, OnInit, OnDestroy } from '@angular/core';
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

    private idsForCheck = {};
    public idsForLoad = {};
    private preLoadProjectionSub: Subscription;
    private projectionSub: Subscription;
    private routeSub: Subscription;
    public compares = [];
    public constantIncomeMaxRow = 0;
    public constantExpenseMaxRow = 0;
    public periodicMaxRow = 0;
    public itemBaseHeight;

    constructor(private route: ActivatedRoute,
                private store: Store<reducerRoot.CalDataState>) {
    }

    ngOnInit() {
        this.initSub();
    }

    private initSub(): void {

        this.routeSub = this.route.params.subscribe(params => {
            if (params['ids']) {
                 this.idsForCheck = this.deserializeIds(params['ids']); // will be deleted
                 this.idsForLoad = this.deserializeIds(params['ids']); // keep seperate reference
            }
        });

        this.preLoadProjectionSub = this.store.pipe(
            select(isProjectionsExistedFromCollection, {ids: this.idsForCheck})
        ).subscribe((notLoaded) => {
            if (notLoaded && Object.keys(notLoaded).length > 0) {
                const projectionIdsNotLoaded = [];
                for (const id in notLoaded) {
                    projectionIdsNotLoaded.push(id);
                }
                this.store.dispatch(new GetProjectionBatchByIdsAction(projectionIdsNotLoaded));
            }
        });

        this.projectionSub = this.store.pipe(
            select(getProjectionsByIds, {ids: this.idsForLoad}),
            filter(collection => (collection !== undefined  && collection.length > 0))
        ).subscribe((collection) => {
            this.compares = collection;
            this.setMaxRows(collection);
            this.setItemBaseHeightByScreenSize(collection);
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
        const ids: string[] = paramIds.split('&');
        const obj = {};
        ids.forEach(i => {
            obj[i.toString()] = false;
        });
        return obj;
    }

    private setMaxRows(collection: any): void {
        this.constantIncomeMaxRow = 0;
        this.constantExpenseMaxRow = 0;
        this.periodicMaxRow = 0;
        collection.forEach( cal => {
            this.constantIncomeMaxRow = Math.max(this.constantIncomeMaxRow, cal.constantIncome.length);
            this.constantExpenseMaxRow = Math.max(this.constantExpenseMaxRow, cal.constantExpense.length);
            this.periodicMaxRow = Math.max(this.periodicMaxRow, cal.periodicalVariable.length);
        });
        this.constantIncomeMaxRow++;
        this.constantExpenseMaxRow++;
        this.periodicMaxRow++;
    }

    private setItemBaseHeightByScreenSize(collection: any): void {
        // TODO:: get screen size, separate constant item height and periodic item height
        // base item height 50px;
        // more than 3 projection on desktop screen height 85px;
        if (collection.length > 3 ) {
            this.itemBaseHeight = 85;
        } else {
            this.itemBaseHeight = 50;
        }
    }

}
