import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/internal/Observable';
import {Action} from '@ngrx/store';
import {
  AddProjectionAction, AddSnapShotAction,
  CalDataActionTypes, TemplateGetSampleAction, UISampleLoadedAction
} from '../actions/calData.action';
import { catchError, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { TemplateService } from '../services/template/template';
import { CalSnapShot } from '../constants/interfaces/cal-snap-shot';

@Injectable()
export class TemplateEffects {

  constructor(private actions$: Actions, private templateService: TemplateService) {}

  @Effect()
  public getTemplateSample$: Observable<Action> = this.actions$.pipe(
    ofType(CalDataActionTypes.GetTemplateSample),
    switchMap((action: TemplateGetSampleAction) =>
      this.templateService
        .getTemplateSample(action.lang)
        .pipe(
          switchMap((data: any) => {
              if (data) {
                 data.lastUpdated = new Date().getTime();
                 const snapshot: CalSnapShot = {
                   id: data.id,
                   name: data.name,
                   lastUpdated: data.lastUpdated
                 };
                 return [
                    new AddSnapShotAction(snapshot),
                    new AddProjectionAction(data),
                    new UISampleLoadedAction()
                 ];
              }
              return [];
          }),
          catchError((e) => of({type: 'Get Template Sample Error', error: e}))
        )
    )
  );
}
