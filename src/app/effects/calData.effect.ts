import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/internal/Observable';
import { CalDataActionTypes, GetCalDataAction, GetCalDataSuccessAction } from 'src/app/actions/calData.action';
import { CalDataService } from 'src/app/services/cal-data/cal-data-service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { CalData } from 'src/app/constants/interfaces/cal-data';


@Injectable()
export class CalDataEffects {
    @Effect()
    public loadCalData$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.GetCalData),
        switchMap((action: GetCalDataAction) =>
            this.calDataService
                .get()
                .pipe(
                    map((data: CalData) => new GetCalDataSuccessAction(data)),
                    catchError((error) => of({ type: 'Get Cal Data Error' }))
                )
        )
    );


    constructor(private actions$: Actions, private calDataService: CalDataService) {}
}
