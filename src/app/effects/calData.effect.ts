import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CalDataActionTypes, GetAllProjectionSnapshotAction, GetAllProjectionSnapshotActionSuccess,
    GetProjectionByIdAction, GetProjectionByIdActionSuccess, UpdateSnapShotAction } from 'src/app/actions/calData.action';
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { error } from '@angular/compiler/src/util';
import { dispatch } from 'rxjs/internal/observable/range';
import { Snapshot } from 'src/app/constants/interfaces/snapshot';


@Injectable()
export class CalDataEffects {

    constructor(private actions$: Actions, private calDataService: CalDataService) {}

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
                        const snapshot: Snapshot = {
                                        id: data.id,
                                        name: data.name,
                                        lastUpdated: data.lastUpdated,
                                        collectionLoaded: true
                                    };
                        return [
                            new UpdateSnapShotAction(snapshot),
                            new GetProjectionByIdActionSuccess(data)
                        ];
                    }),
                    catchError((e) => of ({ type: 'Get Project By Id Error', error: e }))
                )
        )
    );

}
