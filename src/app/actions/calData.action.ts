import { Action } from '@ngrx/store';
import { StandarItem } from 'src/app/constants/interfaces/standar-item';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';
import { FixItem } from 'src/app/constants/interfaces/fix-item';

export enum CalDataActionTypes {
    UpdateConstantIncomeItem = '[Constant Income Item] Update',
    UpdateConstantExpenseItem = '[Constant Expense Item] Update',
    UpdatePeriodicalVariableItem = '[Perodical Variable Item] Update',
    UpdateStaticVariableItem = '[Static Variable Item] Update'
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

export type CalDataActions = UpdateConstantIncomeItemAction
 | UpdateConstantExpenseItemAction | UpdatePeriodicalVariableItemAction
 | UpdateStaticVariableItemAction;
