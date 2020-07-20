import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CalDataActionTypes, GetAllProjectionSnapshotAction, GetAllProjectionSnapshotActionSuccess,
    GetProjectionByIdAction, GetProjectionByIdActionSuccess, UpdatePorjectionAction,
    UpdateSnapShotAction, UpdateProjectionLastUpdatedAction,
    PostProjectionAction, AddSnapShotAction, GetProjectionBatchByIdsAction,
    GetProjectionBatchByIdsActionSuccess, PostProjectionActionSuccess, DeleteProjectionAction, 
    DeleteProjectionFromSnapshotAction, DeleteProjectionFromCollectionAction, UIitemDragClearAction,
    BulkAddConstantIncomeItemAction, BulkAddConstantExpenseItemAction, BulkAddPeriodicalVariableItemAction, UIitemDropAction} from 'src/app/actions/calData.action';
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Snapshot } from '../constants/interfaces/snapshot';
import { InputGroup } from '../constants/enums/input-group';
import { MapperUtil } from '../utils/mapper-util';


@Injectable()
export class CalDataEffects {

    constructor(private actions$: Actions, 
                private calDataService: CalDataService, 
                private router: Router) {}

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

    /* UPDATE EXISTING PROJECTION EFFECT */
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

    /* ADD NEW PROJECTION EFFECT */        
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



    @Effect()
    public deleteProjection$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.DeleteProjection),
        switchMap((action: DeleteProjectionAction) => {
            const userId = 'mockUser';
            return this.calDataService
                        .deleteProjection(userId, action.projectionId)
                        .pipe(
                            switchMap((projectionId: string) => {
                                if (projectionId) {
                                    return [
                                            new DeleteProjectionFromSnapshotAction(projectionId),
                                            new DeleteProjectionFromCollectionAction(projectionId)
                                    ];
                                } else {
                                    return of ({
                                        type: CalDataActionTypes.DeleteProjectionFailed
                                    });
                                }
                            }),
                            catchError((e) => of ({ type: 'Delete Projection Error', error: e }))
                        )
        })  
    );


    /* DRAG AND DROP EFFECT */
    @Effect()
    public uiItemDragAndDrop$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.UIitemDropAction),
        switchMap((action: UIitemDropAction) => {

            const payload = action.payload;
            const item = payload.item;
            const isSingleView = item.projectionId === payload.projectionId;
            const bothConstant = (payload.type === InputGroup.CONSTANT_INCOME || payload.type === InputGroup.CONSTANT_EXPENSE) 
                                    && (item.type === InputGroup.CONSTANT_INCOME || item.type === InputGroup.CONSTANT_EXPENSE);
            const bothPeriodic = payload.type === InputGroup.PERIODICAL_VARIBLE && item.type == InputGroup.PERIODICAL_VARIBLE;                   
            const actionAble = bothConstant || bothPeriodic;

            if (payload.type === item.type && isSingleView) {
                console.log(' sorting kick in');
                // TODO:: sort order on same group
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });

            } else if (actionAble && !isSingleView) {
                /* Copy and paste on different group Logic */
                console.log(' copy and paste kick in ');
                const baseItem = {
                    id: MapperUtil.generateRandomId(), 
                    name: item.name, 
                    amount: item.amount, 
                    cycle: item.cycle, 
                    active: item.active
                };

                if (payload.type === InputGroup.CONSTANT_INCOME) {
                    return [
                        new BulkAddConstantIncomeItemAction(payload.projectionId, [baseItem]),
                        new UIitemDragClearAction()
                    ];   
                } else if (payload.type === InputGroup.CONSTANT_EXPENSE) {
                    return [
                        new BulkAddConstantExpenseItemAction(payload.projectionId, [baseItem]),
                        new UIitemDragClearAction()
                    ];
                } else if (payload.type === InputGroup.PERIODICAL_VARIBLE) {
                    const periodicItem = {
                        ...baseItem,
                        affectiveMonth: item.affectiveMonth
                    };
                    return [
                        new BulkAddPeriodicalVariableItemAction(payload.projectionId, [periodicItem]),
                        new UIitemDragClearAction()
                    ];
                }
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });

            } else if (actionAble && isSingleView) {
                // TODO:: move on same on same group
                console.log('move on same on same group')
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });
            }
                
        })
    );
            

    protected constuctSnapShot(data: CalData): Snapshot {
        return {
            id: data.id,
            name: data.name,
            lastUpdated: data.lastUpdated
        };
    }

}
