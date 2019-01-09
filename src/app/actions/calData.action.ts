import { Action } from '@ngrx/store';
import { StandarItem } from 'src/app/constants/interfaces/standar-item';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';
import { FixItem } from 'src/app/constants/interfaces/fix-item';
import { CalData } from 'src/app/constants/interfaces/cal-data';

export enum CalDataActionTypes {
    GetCalData = '[Cal Data] Get',
    GetCalDataSuccess = '[Cal Data] Get Success',
    UpdateConstantIncomeItem = '[Constant Income Item] Update',
    UpdateConstantExpenseItem = '[Constant Expense Item] Update',
    UpdatePeriodicalVariableItem = '[Perodical Variable Item] Update',
    UpdateStaticVariableItem = '[Static Variable Item] Update',
    DeleteConstantIncomeItem = '[Constant Income Item] Delete',
    DeleteConstantExpenseItem = '[Constant Expense Item] Delete',
    DeletePeriodicalVariableItem = '[Perodical Variable Item] Delete',
    DeleteStaticVariableItem = '[Static Variable Item] Delete'
}

export class GetCalDataAction implements Action {
    readonly type = CalDataActionTypes.GetCalData;
}

export class GetCalDataSuccessAction implements Action {
    readonly type = CalDataActionTypes.GetCalDataSuccess;
    constructor(public payload: CalData) {}
}

export class UpdateConstantIncomeItemAction implements Action {
    readonly type = CalDataActionTypes.UpdateConstantIncomeItem;
    constructor(public payload: StandarItem) {}
}

export class UpdateConstantExpenseItemAction implements Action {
    readonly type = CalDataActionTypes.UpdateConstantExpenseItem;
    constructor(public payload: StandarItem) {}
}

export class UpdatePeriodicalVariableItemAction implements Action {
    readonly type = CalDataActionTypes.UpdatePeriodicalVariableItem;
    constructor(public payload: PeriodicItem) {}
}

export class UpdateStaticVariableItemAction implements Action {
    readonly type = CalDataActionTypes.UpdateStaticVariableItem;
    constructor(public payload: FixItem) {}
}

export class DeleteConstantIcomeItemAction implements Action {
    readonly type = CalDataActionTypes.DeleteConstantIncomeItem;
    constructor(public itemId: number) {}
}

export class DeleteConstantExpenseItemAction implements Action {
    readonly type = CalDataActionTypes.DeleteConstantExpenseItem;
    constructor(public itemId: number) {}
}

export class DeletePeriodicalVariableItemAction implements Action {
    readonly type = CalDataActionTypes.DeletePeriodicalVariableItem;
    constructor(public itemId: number) {}
}

export class DeleteStaticVariableItemAction implements Action {
    readonly type = CalDataActionTypes.DeleteStaticVariableItem;
    constructor(public itemId: number) {}
}

export type CalDataActions = UpdateConstantIncomeItemAction
 | UpdateConstantExpenseItemAction | UpdatePeriodicalVariableItemAction
 | UpdateStaticVariableItemAction | GetCalDataAction | GetCalDataSuccessAction
 | DeleteConstantIcomeItemAction | DeleteConstantExpenseItemAction
 | DeletePeriodicalVariableItemAction | DeleteStaticVariableItemAction;
