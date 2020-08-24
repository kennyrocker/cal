import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs/internal/Observable';
import { Action, Store } from '@ngrx/store';
import {
  BulkAddConstantExpenseItemAction,
  BulkAddConstantIncomeItemAction,
  BulkAddPeriodicalVariableItemAction,
  CalDataActionTypes,
  SelectedCopyProjectionPreloadAction,
  DeleteConstantExpenseItemAction,
  DeleteConstantIcomeItemAction,
  UIitemDragClearAction,
  UIitemDropAction,
  SelectedCopyProjectionLoadedAction, GetProjectionByIdActionSuccess, RouteToProjectionAction
} from '../actions/calData.action';
import { switchMap } from 'rxjs/operators';
import { InputGroup } from '../constants/enums/input-group';
import { of } from 'rxjs';
import { MapperUtil } from '../utils/mapper-util';
import { Router } from '@angular/router';
import * as reducerRoot from '../reducers';
import { getProjectionById } from '../selectors/selectors';
import { Constant } from '../constants/constant';

@Injectable()
export class UIEffects {

    constructor(private actions$: Actions,
                private router: Router,
                private store: Store<reducerRoot.CalDataState>) {}

    /* DRAG AND DROP EFFECT */
    @Effect()
    public uiItemDragAndDrop$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.UIitemDropAction),
        switchMap((action: UIitemDropAction) => {

            const payload = action.payload;
            const item = payload.item;
            const isOnSameProjection = item.projectionId === payload.projectionId;
            const bothConstant = (payload.type === InputGroup.CONSTANT_INCOME || payload.type === InputGroup.CONSTANT_EXPENSE)
              && (item.type === InputGroup.CONSTANT_INCOME || item.type === InputGroup.CONSTANT_EXPENSE);
            const bothPeriodic = payload.type === InputGroup.PERIODICAL_VARIBLE && item.type === InputGroup.PERIODICAL_VARIBLE;
            const actionAble = bothConstant || bothPeriodic;

            const movingItem = {
                id: MapperUtil.generateRandomId(),
                name: item.name,
                amount: item.amount,
                cycle: item.cycle,
                active: item.active
            };

            if (payload.type === item.type && isOnSameProjection) {
                console.log(' sorting kick in');
                // TODO:: sort order on same group
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });

            }
            else if (actionAble && !isOnSameProjection) {
                /* Copy and paste on different group Logic */
                if (payload.type === InputGroup.CONSTANT_INCOME) {
                    return [
                      new BulkAddConstantIncomeItemAction(payload.projectionId, [movingItem]),
                      new UIitemDragClearAction()
                    ];
                } else if (payload.type === InputGroup.CONSTANT_EXPENSE) {
                    return [
                      new BulkAddConstantExpenseItemAction(payload.projectionId, [movingItem]),
                      new UIitemDragClearAction()
                    ];
                } else if (payload.type === InputGroup.PERIODICAL_VARIBLE) {
                    const periodicMovingItem = {
                      ...movingItem,
                      affectiveMonth: item.affectiveMonth
                    };
                    return [
                      new BulkAddPeriodicalVariableItemAction(payload.projectionId, [periodicMovingItem]),
                      new UIitemDragClearAction()
                    ];
                }
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });

            }
            else if (actionAble && isOnSameProjection) {
                /* Move item of same type within the same projection */
                if (item.type === InputGroup.CONSTANT_INCOME && payload.type === InputGroup.CONSTANT_EXPENSE) {
                    // moving income to expense
                    return [
                        new BulkAddConstantExpenseItemAction(payload.projectionId, [movingItem]),
                        new DeleteConstantIcomeItemAction(payload.projectionId, item.id),
                        new UIitemDragClearAction()
                    ];
                } else if (item.type === InputGroup.CONSTANT_EXPENSE && payload.type === InputGroup.CONSTANT_INCOME) {
                    // moving expense to income
                    return [
                        new BulkAddConstantIncomeItemAction(payload.projectionId, [movingItem]),
                        new DeleteConstantExpenseItemAction(payload.projectionId, item.id),
                        new UIitemDragClearAction()
                    ];
                }
                return of ({ type: CalDataActionTypes.UIitemDragClearAction });
            }

        })
    );


    /* Select Copy and Compare */
    @Effect()
    public copySelectedProjectionPreload$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.SelectedCopyProjectionPreload),
        switchMap( (action: SelectedCopyProjectionPreloadAction) => {
            return this.store.select(getProjectionById, {id: action.projectionId}).pipe(
                switchMap( (data) => {
                    if (data) {
                        // TODO:: dispatch unlocking ui lock
                        return [
                            new SelectedCopyProjectionLoadedAction(data)
                        ];
                    }
                    return [];
                })
            );
      })
    );

    @Effect()
    public copySelectedProjectionLoaded$: Observable<Action> = this.actions$.pipe(
        ofType(CalDataActionTypes.SelectedCopyProjectionLoaded),
        switchMap( (action: SelectedCopyProjectionLoadedAction) => {
            const copy = { ...action.payload };
            copy.name = `${copy.name}${Constant.COPY_SUFFIX}`;
            copy.id = Constant.COPY_ID;
            delete copy._id;
            delete copy.userId;
            return [
                new GetProjectionByIdActionSuccess(copy),
                new RouteToProjectionAction(copy.id)
            ];
        })
    );

}
