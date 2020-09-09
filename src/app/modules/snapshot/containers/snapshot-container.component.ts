import { OnInit, OnDestroy, Component } from '@angular/core';

import { Store } from '@ngrx/store';
import * as reducerRoot from '../../../reducers/index';
import {
  GetAllProjectionSnapshotAction,
  SnapShotSelectedUpdateUIAction,
  DeleteProjectionAction, SelectedCopyProjectionPreloadAction, GetProjectionByIdAction
} from 'src/app/actions/calData.action';

import { CalSnapShot } from 'src/app/constants/interfaces/cal-snap-shot';

import { Subscription } from 'rxjs/internal/Subscription';
import {
  getAllSnapShots, isSnapShotsLoaded, getSnapshotSelected,
  getUser, isProjectionExistedFromCollection
} from 'src/app/selectors/selectors';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { Constant } from 'src/app/constants/constant';
import { UserState } from '../../../constants/interfaces/user';
import { combineLatest, Observable } from 'rxjs';
import { faCopy, faBalanceScale, faChartBar, faShare, faShareAltSquare } from '@fortawesome/free-solid-svg-icons';
import { ModalType } from '../../../constants/enums/modal-type';
import { Share } from '../../../services/share/share';
import { environment } from '../../../../environments/environment';


@Component({
    selector: 'app-snapshot-container',
    templateUrl: './snapshot-container.component.html',
    styleUrls: ['./snapshot-container.component.scss']
})
export class SnapshotContainerComponent implements OnInit, OnDestroy {

    public list: CalSnapShot[] = [];
    private snapShotSub: Subscription;

    private selectionChangeSubject = new Subject<any>();
    private selectionSubjectSub: Subscription;
    private snapshotSelectedSub: Subscription;
    private selectShareSub: Subscription;
    public snapshotSelected = [];
    private userState$: Observable<UserState>;
    private isLoaded$: Observable<boolean>;
    private fetchSnapShotSub: Subscription;

    public copyIcon = faCopy;
    public scaleIcon = faBalanceScale;
    public pluseIcon = faChartBar;
    public shareIcon = faShareAltSquare;
    public shareCopyIcon = faShare;

    // share modal
    public modalType = ModalType;
    public shareModalShow = false;
    public shareUrl: string;

    constructor(public store: Store<reducerRoot.CalDataState>,
                private shareService: Share,
                private router: Router) {}

    ngOnInit() {

        this.userState$ = this.store.select(getUser);
        this.isLoaded$ = this.store.select(isSnapShotsLoaded);
        this.fetchSnapShotSub = combineLatest(this.userState$, this.isLoaded$,
          (user: UserState , isLoaded: boolean) => ({ user, isLoaded }))
          .subscribe(obj => {
            if (obj.user.id !== null && !obj.isLoaded) {
                this.store.dispatch(new GetAllProjectionSnapshotAction(obj.user.id));
            }
        });

        this.snapShotSub = this.store.select(getAllSnapShots)
            .subscribe((data) => {
                if (data) {
                    this.list = data;
                }
            });

        this.snapshotSelectedSub = this.store.select(getSnapshotSelected)
            .subscribe((data) => {
                if (data && data.length > 0) {
                    this.snapshotSelected = data;
                }
        });

        this.selectionSubjectSub = this.selectionChangeSubject.pipe(
                debounceTime(Constant.CHECKBOX_DEBOUNCE_TIME)
            ).subscribe((value) => {
                this.toggleSelection(value);
            });

    }

    ngOnDestroy() {
        this.snapshotSelectedSub.unsubscribe();
        this.selectionSubjectSub.unsubscribe();
        this.snapShotSub.unsubscribe();
        this.fetchSnapShotSub.unsubscribe();
        if (this.selectShareSub) this.selectShareSub.unsubscribe();
    }

    public bindSelectionChangeSubject(value): void {
        this.selectionChangeSubject.next(value);
    }

    public createProjection(): void {
        this.routeToProjection(Constant.NEW_ROUTE_NAME);
    }

    public compare(): void {
        this.store.dispatch(new SnapShotSelectedUpdateUIAction(this.snapshotSelected));
        const url = '/compare/' + this.snapshotSelected.join('&');
        this.router.navigateByUrl(url);
    }

    public copy(): void {
        const id = this.snapshotSelected[0];
        this.store.dispatch(new SelectedCopyProjectionPreloadAction(id));
    }

    public isItemSelected(projectionId: string): boolean {
        return this.snapshotSelected.indexOf(projectionId) !== -1;
    }

    private toggleSelection(projectionId: string): void {
        // pre fetch projection for operations
        // TODO:: dispatch loading UI lock
        if (projectionId !== Constant.SAMPLE_PROJECTION_ID) {
            this.store.select(isProjectionExistedFromCollection, {id: projectionId})
                .subscribe((bool) => {
                    if (!bool) this.store.dispatch(new GetProjectionByIdAction(projectionId));
            });
        }
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

    public stopPropagation(event: any): void {
        event.stopPropagation();
    }


    public routeToProjection(projectionId: string): void {
        const url = `/projection/${projectionId}`;
        this.router.navigateByUrl(url);
    }

    public selectedIsSampleProjection(): boolean {
        return this.snapshotSelected[0] === Constant.SAMPLE_PROJECTION_ID;
    }

    public isSampleProjection(projectionId: string): boolean {
        return projectionId === Constant.SAMPLE_PROJECTION_ID;
    }

    public share(): void {
        const id = this.snapshotSelected[0];
        this.selectShareSub = this.shareService.postShareProjection(id)
          .subscribe((res) => {
              if (res.shareId) {
                const url = `${environment.baseUrl}/projection/${res.shareId}`;
                this.shareUrl = url;
                this.shareModalShow = true;
              }
          });
    }

    public copyToClipBoard(): void {
        const urlInput = document.getElementById('shareUrl') as HTMLInputElement;
        urlInput.focus();
        urlInput.select();
        try {
          document.execCommand('copy');
        } catch (err) {
          console.log('browser not supported copy command');
        }
    }

}
