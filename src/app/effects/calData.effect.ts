import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import {
  CalDataActionTypes,
  GetAllProjectionSnapshotAction,
  GetAllProjectionSnapshotActionSuccess,
  GetProjectionByIdAction,
  GetProjectionByIdActionSuccess,
  UpdatePorjectionAction,
  UpdateSnapShotAction,
  UpdateProjectionLastUpdatedAction,
  PostProjectionAction,
  AddSnapShotAction,
  GetProjectionBatchByIdsAction,
  GetProjectionBatchByIdsActionSuccess,
  PostProjectionActionSuccess,
  DeleteProjectionAction,
  DeleteProjectionFromSnapshotAction,
  DeleteProjectionFromCollectionAction,
  AddProjectionAction
} from 'src/app/actions/calData.action';
import { Projection } from 'src/app/services/projection/projection';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { CalSnapShot } from '../constants/interfaces/cal-snap-shot';
import { Constant } from '../constants/constant';


@Injectable()
export class CalDataEffects {

    constructor(private actions$: Actions,
                private calDataService: Projection,
                private router: Router) {}

    @Effect()
    public getSnapshot$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.GetAllProjectionSnapshot),
        switchMap((action: GetAllProjectionSnapshotAction) =>
            this.calDataService
                .getSnapshotsByUserId(action.userId)
                .pipe(
                    map((data: any) => new GetAllProjectionSnapshotActionSuccess(data)),
                    catchError((e) => of ({ type: 'Get CalSnapshot Data Error', error: e }))
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
                    catchError((e) => of ({ type: 'Get CalSnapshot Data Error', error: e }))
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
            return this.calDataService
                .getProjectionBatchByIds(action.ids)
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
                );
            }
        )
    );

    /* UPDATE EXISTING PROJECTION EFFECT */
    @Effect()
    public updateProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.UpdateProjection),
        switchMap((action: UpdatePorjectionAction) => {
            return this.calDataService
                        .updateProjection(action.projection)
                        .pipe(
                            switchMap((res: any) => {
                                if (res && res.lastUpdated) {
                                    return [
                                        new UpdateSnapShotAction(
                                            this.constructSnapShot(action.projection.id, action.projection.name, res.lastUpdated)),
                                        new UpdateProjectionLastUpdatedAction(action.projection.id, res.lastUpdated)
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

    /* ADD NEW PROJECTION EFFECT */
    @Effect()
    public postProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.PostProjection),
        switchMap((action: PostProjectionAction) => {
            return this.calDataService
                        .postProjection(action.userId, action.projection)
                        .pipe(
                            switchMap((data: CalData) => {
                                if (data.id && data.lastUpdated) {
                                    return [
                                            new AddProjectionAction(data),
                                            new AddSnapShotAction(this.constructSnapShot(data.id, data.name, data.lastUpdated)),
                                            new PostProjectionActionSuccess(data.id),
                                            new DeleteProjectionFromCollectionAction(Constant.TEMP_PROJECTION_ID)
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

    @Effect()
    public deleteProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.DeleteProjection),
        switchMap((action: DeleteProjectionAction) => {
            if (action.deleteLocalOnly) {
                return [
                    new DeleteProjectionFromSnapshotAction(action.projectionId),
                    new DeleteProjectionFromCollectionAction(action.projectionId)
                ];
            } else {
                return this.calDataService
                    .deleteProjection(action.projectionId)
                    .pipe(
                        switchMap((res: any) => {
                            if (res && res.deletedId) {
                                return [
                                    new DeleteProjectionFromSnapshotAction(res.deletedId),
                                    new DeleteProjectionFromCollectionAction(res.deletedId)
                                ];
                            } else {
                                return of ({
                                    type: CalDataActionTypes.DeleteProjectionFailed
                                 });
                            }
                        }),
                        catchError((e) => of ({ type: 'Delete Projection Error', error: e }))
                  );
            }
        })
    );

    protected constructSnapShot(id: string, name: string, lastUpdated: number): CalSnapShot {
        return { id, name, lastUpdated };
    }

}
