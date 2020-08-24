import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as reducerRoot from '../../../reducers/index';
import { filter } from 'rxjs/operators';
import { select } from '@ngrx/store';
import { getProjectionById, isProjectionExistedFromCollection } from 'src/app/selectors/selectors';
import { GetProjectionByIdAction, AddBlankProjectionAction } from 'src/app/actions/calData.action';
import { Constant } from '../../../constants/constant';

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
    public projection: any;
    public isNewProjection = false;

    public constantIncomeMaxRow = 0;
    public constantExpenseMaxRow = 0;
    public periodicMaxRow = 0;

    constructor(private route: ActivatedRoute,
        public store: Store<reducerRoot.CalDataState>) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            const id = params['id'];
            if (id === Constant.NEW_ROUTE_NAME) { // projection/new route
                this.isNewProjection = true;
                this.prepareNewProjection();
            } else if (id === Constant.COPY_ID) { // projection/copy_id route
                this.isNewProjection = true;
                this.prepareProjection(id);
            } else { // projection/:id route
                this.prepareProjection(id);
            }
        });
        this.initProjectionSub();
    }

    private prepareProjection(projectionId: string): void {
        this.projectionId = projectionId;
        this.isLoadedSub = this.store.pipe(
            select(isProjectionExistedFromCollection, {id:  this.projectionId})
        ).subscribe((isLoaded) => {
            if (!isLoaded && this.projectionId !== Constant.COPY_ID) {
                this.store.dispatch(new GetProjectionByIdAction(this.projectionId));
            }
        });
    }

    private prepareNewProjection(): void {
        this.projectionId = Constant.NEW_PROJECTION_ID;
        this.store.dispatch(new AddBlankProjectionAction(this.projectionId));
    }

    private initProjectionSub(): void {
        this.projectionSub = this.store.pipe(
            select(getProjectionById, {id: this.projectionId}),
            filter(data => data !== undefined)
        ).subscribe( data => {
            this.projection = data;
            this.setMaxRows(data);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.projectionSub.unsubscribe();
        if (this.isLoadedSub) this.isLoadedSub.unsubscribe();
    }

    private setMaxRows(cal: any): void {
        let constantMaxRow = 0;
        constantMaxRow = Math.max(constantMaxRow,  cal.constantIncome.length, cal.constantExpense.length);
        this.constantIncomeMaxRow = constantMaxRow + 1;
        this.constantExpenseMaxRow = constantMaxRow + 1;
        this.periodicMaxRow = cal.periodicalVariable.length + 1;
    }

}
