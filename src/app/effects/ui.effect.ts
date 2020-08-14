import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/internal/Observable';
import { Action } from '@ngrx/store';
import {
  BulkAddConstantExpenseItemAction,
  BulkAddConstantIncomeItemAction, BulkAddPeriodicalVariableItemAction,
  CalDataActionTypes,
  UIitemDragClearAction,
  UIitemDropAction
} from '../actions/calData.action';
import { switchMap } from 'rxjs/operators';
import { InputGroup } from '../constants/enums/input-group';
import { of } from 'rxjs';
import { MapperUtil } from '../utils/mapper-util';

@Injectable()
export class UIEffects {

    constructor(private actions$: Actions) {}

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
            const bothPeriodic = payload.type === InputGroup.PERIODICAL_VARIBLE && item.type === InputGroup.PERIODICAL_VARIBLE;
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
                console.log('move on same on same group');
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });
            }

        })
    );

}
