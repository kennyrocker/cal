import { OnInit, OnDestroy, Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as reducerRoot from '../../../reducers/index';
import { filter } from 'rxjs/operators';
import { select } from '@ngrx/store';
import { getProjectionById, isProjectionExistedFromCollection } from 'src/app/selectors/selectors';
import { GetProjectionByIdAction, AddProjectionAction } from 'src/app/actions/calData.action';
import { MapperUtil } from 'src/app/utils/mapper-util';

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
    public projectionFound: boolean;
    private isNewProjection = false;

    constructor(private route: ActivatedRoute,
        public store: Store<reducerRoot.CalDataState>) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id'] === 'new') { // projection/new route
                this.prepareNewProjection();
            } else {                      // projection/:id route
                this.prepareProjection(params['id']);
            }
        });
        this.initProjectionSub();
    }

    private prepareProjection(projectionId: string): void {
        this.projectionId = projectionId;
        this.isLoadedSub = this.store.pipe(
            select(isProjectionExistedFromCollection, {id:  this.projectionId})
        ).subscribe((isLoaded) => {
            if (!isLoaded) {
                this.store.dispatch(new GetProjectionByIdAction(this.projectionId));
            }
        });
    }

    private prepareNewProjection(): void {
        this.isNewProjection = true;
        // TODO:: user real userid
        this.projectionId = MapperUtil.generateProjectionId('userId');
        this.store.dispatch(new AddProjectionAction(this.projectionId));
    }

    private initProjectionSub(): void {
        this.projectionSub = this.store.pipe(
            select(getProjectionById, {id: this.projectionId}),
            filter(data => data !== undefined)
        ).subscribe( data => {
            this.projection = data;
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
        this.projectionSub.unsubscribe();
        this.isLoadedSub.unsubscribe();
    }

}
