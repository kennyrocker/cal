import { OnInit, OnDestroy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../reducers/index';
import { GetAllProjectionSnapshotAction, SnapShotSelectedUpdateUIAction, DeleteProjectionAction } from 'src/app/actions/calData.action';

import { Snapshot } from 'src/app/constants/interfaces/snapshot';

import { Subscription } from 'rxjs/internal/Subscription';
import { getAllSnapShots, isSnapShotsLoaded, getSnapshotSelected } from 'src/app/selectors/selectors';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Constant } from 'src/app/constants/constant';


@Component({
    selector: 'app-snapshot-container',
    templateUrl: './snapshot-container.component.html',
    styleUrls: ['./snapshot-container.component.scss']
})
export class SnapshotContainerComponent implements OnInit, OnDestroy {

    public list: Snapshot[];
    private snapShotSub: Subscription;
    private snapShotLoadedSub: Subscription;

    private selectionChangeSubject = new Subject<any>();
    private selectionSubjectSub: Subscription;
    private snapshotSelectedSub: Subscription;
    private snapshotSelected = [];

    constructor(public store: Store<reducerRoot.CalDataState>, private router: Router) {}

    ngOnInit() {

        this.snapshotSelectedSub = this.store.select(getSnapshotSelected)
            .subscribe((data) => {
                if (data && data.length > 0) {
                    this.snapshotSelected = data;
                }
            });

        this.snapShotLoadedSub = this.store.select(isSnapShotsLoaded)
            .subscribe((isLoaded) => {
                if (!isLoaded) {
                    this.store.dispatch(new GetAllProjectionSnapshotAction('ueserId'));
                }
            });

        this.snapShotSub = this.store.select(getAllSnapShots)
            .subscribe((data) => {
                if (data) {
                    this.list = data;
                }
            });

        this.selectionSubjectSub = this.selectionChangeSubject.pipe(
                debounceTime(Constant.CHECKBOX_DEBOUNCE_TIME)
            ).subscribe((value) => {
                this.toggleSelection(value);
            });

    }

    ngOnDestroy() {
        this.snapShotSub.unsubscribe();
        this.snapshotSelectedSub.unsubscribe();
        this.snapShotLoadedSub.unsubscribe();
        this.selectionSubjectSub.unsubscribe();
    }

    public bindSelectionChangeSubject(value): void {
        this.selectionChangeSubject.next(value);
    }

    public createProjection(): void {
        this.router.navigateByUrl('/projection/new');
    }

    public compare(): void {
        this.store.dispatch(new SnapShotSelectedUpdateUIAction(this.snapshotSelected));
        const url = '/compare/' + this.snapshotSelected.join("&");
        this.router.navigateByUrl(url);
    }

    public isItemSelected(projectionId: string): boolean {
        return this.snapshotSelected.indexOf(projectionId) !== -1
    }

    private toggleSelection(projectionId: string): void {
        // TODO:: This mess up with the projection order, 
        // but later the compare should presist the order by filter such as lastupdated
        if (this.isItemSelected(projectionId)) {
            const index = this.snapshotSelected.indexOf(projectionId);
            this.snapshotSelected.splice(index, 1);
        } else {
            this.snapshotSelected.push(projectionId);
        }
    }

    public deleteProjection(projectionId: string): void {
        this.store.dispatch(new DeleteProjectionAction(projectionId));
    }
    

}
