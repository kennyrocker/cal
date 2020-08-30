import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
    public constantItemHeight: number;
    public periodicItemHeight: number;
    private winWidth: number;
    private collectionSize: number;


    constructor(private route: ActivatedRoute,
                private store: Store<reducerRoot.CalDataState>) {
    }

    ngOnInit() {
        this.initSub();
    }


    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.winWidth = window.innerWidth;
        this.setItemBaseHeightByScreenSize(this.winWidth, this.collectionSize || 2);
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
            const size = collection.length;
            this.collectionSize = size;
            const width = this.winWidth || window.innerWidth;
            this.setItemBaseHeightByScreenSize(width, size);
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

    /**
     *   Collection size                                \___2___\___3___\___4___\
     *   Periodic item win width break point  @3 line   \  756  \  1018 \  1480 \
     *   Constant item win width break point  @2 line   \  952  \  1412 \  1872 \
     *   Periodic item win width break point  @2 line   \  1360 \  2024 \  2688 \
     */
    private setItemBaseHeightByScreenSize(width: number, size: number): void {
        if (size === 2) {
            this.handleByBreakPointsAndWidth(width, 756, 952, 1360);
        }
        if (size === 3) {
            this.handleByBreakPointsAndWidth(width, 1018, 1412, 2024);
        }
        if (size >= 4) {
            this.handleByBreakPointsAndWidth(width, 1480, 1872, 2688);
        }
    }

    private handleByBreakPointsAndWidth(width: number, breakpoint1: number, breakpoint2: number, breakpoint3: number): void {
        if (width < breakpoint1) {
          this.setPeriodicThreeLine();
        } else if (width > breakpoint1 && width < breakpoint2 ) {
          this.setAllTwoLine();
        } else if (width > breakpoint2 && width < breakpoint3) {
          this.setPeriodicTwoLine();
        } else {
          this.setAllOneLine();
        }
    }

    /**
     *   Constant item Height @2 line 82px
     *   Periodic item Height @3 line 120px
     */
    private setPeriodicThreeLine(): void {
        this.constantItemHeight = 82;
        this.periodicItemHeight = 120;
    }

    /**
     *   Constant item Height @2 line 82px
     *   Periodic item Height @2 line 87px
     */
    private setAllTwoLine(): void  {
        this.constantItemHeight = 82;
        this.periodicItemHeight = 87;
    }

    /**
     *   Constant item Height @1 line 52px
     *   Periodic item Height @2 line 87px
     */
    private setPeriodicTwoLine(): void {
        this.constantItemHeight = 52;
        this.periodicItemHeight = 87;
    }

    /**
     *   Constant item Height @1 line 52px
     *   Periodic item Height @1 line 54px
     */
    private setAllOneLine(): void {
        this.constantItemHeight = 52;
        this.periodicItemHeight = 54;
    }

}
