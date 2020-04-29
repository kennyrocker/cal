import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CalDataActionTypes, GetAllProjectionSnapshotAction, GetAllProjectionSnapshotActionSuccess,
    GetProjectionByIdAction, GetProjectionByIdActionSuccess, UpdatePorjectionAction,
    UpdateSnapShotAction, UpdateProjectionLastUpdatedAction,
    PostProjectionAction, AddSnapShotAction, GetProjectionBatchByIdsAction, GetProjectionBatchByIdsActionSuccess, PostProjectionActionSuccess } from 'src/app/actions/calData.action';
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Snapshot } from '../constants/interfaces/snapshot';


@Injectable()
export class CalDataEffects {

    constructor(private actions$: Actions, private calDataService: CalDataService, private router: Router) {}

    @Effect()
    public getSnapshot$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.GetAllProjectionSnapshot),
        switchMap((action: GetAllProjectionSnapshotAction) =>
            this.calDataService
                .getSnapshotsByUserId(action.userId)
                .pipe(
                    map((data: any) => new GetAllProjectionSnapshotActionSuccess(data)),
                    catchError((e) => of ({ type: 'Get Snapshot Data Error', error: e }))
                )
        )
    );

    @Effect()
    public getProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.GetProjectionById),
        switchMap((action: GetProjectionByIdAction) =>
            this.calDataService
                .getProjectionById(action.projectionId)
                .pipe(
                    switchMap((data: CalData) => {
                        if (data.id) {
                            return [
                                    new GetProjectionByIdActionSuccess(data)
                            ];
                        } else {
                            return of ({
                                type: CalDataActionTypes.GetProjectionByIdFailed
                            });
                        }

                    }),
                    catchError((e) => of ({ type: 'Get Snapshot Data Error', error: e }))
                )
        )
    );

    @Effect({ dispatch: false })
        pageNotFound = this.actions$.pipe(
            ofType(CalDataActionTypes.GetProjectionByIdFailed),
            tap(() => this.router.navigate(['404']))
    );
    
    @Effect()
    public getProjectionBatch$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.GetProjectionBatchByIds),
        switchMap((action: GetProjectionBatchByIdsAction) => {
            // TODO:: use real user id here
            const userId = 'mockUser';
            return this.calDataService
                .getProjectionBatchByIds(userId, action.ids)
                .pipe(
                    switchMap((data: any) => {
                        if (data && data.length > 0) {
                            return [
                                    new GetProjectionBatchByIdsActionSuccess(data)
                            ];
                        } else {
                            return of ({
                                type: CalDataActionTypes.GetProjectionBatchByIdsFailed
                            });
                        }

                    }),
                    catchError((e) => of ({ type: 'Get Projection Batch Error', error: e }))
                )
            }
        )
    );

    @Effect()
    public updateProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.UpdateProjection),
        switchMap((action: UpdatePorjectionAction) => {
            // TODO:: use real user id here
            const userId = 'mockUser';
            return this.calDataService
                        .updatePorjection(userId, action.projection)
                        .pipe(
                            switchMap((data: CalData) => {
                                if (data.lastUpdated) {
                                    return [
                                            new UpdateSnapShotAction(this.constuctSnapShot(data)),
                                            new UpdateProjectionLastUpdatedAction(data.id, data.lastUpdated)
                                    ];
                                } else {
                                    return of ({
                                        type: CalDataActionTypes.UpdateProjectionFailed
                                    });
                                }
                            }),
                            catchError((e) => of ({ type: 'Update Projection Error', error: e }))
                        );
            }
        )
    );

    @Effect()
    public postProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.PostProjection),
        switchMap((action: PostProjectionAction) => {
            // TODO:: use real user id here
            const userId = 'mockUser';
            return this.calDataService
                        .updatePorjection(userId, action.projection)
                        .pipe(
                            switchMap((data: CalData) => {
                                if (data.lastUpdated) {
                                    return [
                                            new AddSnapShotAction(this.constuctSnapShot(data)),
                                            new UpdateProjectionLastUpdatedAction(data.id, data.lastUpdated),
                                            new PostProjectionActionSuccess(data.id)
                                    ];
                                } else {
                                    return of ({
                                        type: CalDataActionTypes.UpdateProjectionFailed
                                    });
                                }
                            }),
                            catchError((e) => of ({ type: 'Post Projection Error', error: e }))
                        );
            }
        )
    );

    @Effect({ dispatch: false })
        postProjectionSuccess = this.actions$.pipe(
            ofType(CalDataActionTypes.PostProjectionSuccess),
            map((action: PostProjectionActionSuccess) => {
                const url =  'projection/' + action.projectionId;
                this.router.navigate([url]);
            }
        )
    );

    protected constuctSnapShot(data: CalData): Snapshot {
        return {
            id: data.id,
            name: data.name,
            lastUpdated: data.lastUpdated
        };
    }



}
