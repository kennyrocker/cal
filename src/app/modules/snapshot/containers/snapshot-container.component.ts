import { OnInit, OnDestroy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../reducers/index';
import { GetAllProjectionSnapshotAction } from 'src/app/actions/calData.action';

import { Snapshot } from 'src/app/constants/interfaces/snapshot';

import { Subscription } from 'rxjs/internal/Subscription';
import { getAllSnapShots, isSnapShotsLoaded } from 'src/app/selectors/selectors';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';

import { FormateTimePipe } from '../../share/pipes/formateTimePipe';
import { Router } from '@angular/router';


@Component({
    selector: 'app-snapshot-container',
    templateUrl: './snapshot-container.component.html',
    styleUrls: ['./snapshot-container.component.scss']
})
export class SnapshotContainerComponent implements OnInit, OnDestroy {

    public list: Snapshot[];
    private snapShotSub: Subscription;
    private snapShotLoadedSub: Subscription;

    private actionArray = [];

    constructor(public store: Store<reducerRoot.CalDataState>, private router: Router) {}

    ngOnInit() {
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
    }

    ngOnDestroy() {
        this.snapShotLoadedSub.unsubscribe();
        this.snapShotSub.unsubscribe();
    }

    public createProjection(): void {
        this.router.navigateByUrl('/projection/new');
    }

    public compare(): void {
        //
    }
}
