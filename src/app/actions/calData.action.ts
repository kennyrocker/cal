import { Action } from '@ngrx/store';
import { StandarItem } from 'src/app/constants/interfaces/standar-item';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';
import { FixItem } from 'src/app/constants/interfaces/fix-item';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { Snapshot } from 'src/app/constants/interfaces/snapshot';
import { Lock } from '../constants/interfaces/lock';

export enum CalDataActionTypes {
    GetAllProjectionSnapshot = '[Get All Projection Snapshot] Get',
    GetAllProjectionSnapshotSuccess = '[Get All Projection Snapshot] Get Success',
    GetProjectionById = '[Get Projection By Id] Get',
    GetProjectionByIdSuccess = '[Get Projection By Id] Get Success',
    GetProjectionByIdFailed = '[Get Projection By Id] Get Failed',
    GetProjectionBatchByIds = '[Get Projection Batch By Ids] Get',
    GetProjectionBatchByIdsSuccess = '[Get Projection Batch By Ids] Get Success',
    GetProjectionBatchByIdsFailed = '[Get Projection Batch By Ids] Get Failed',
    AddConstantIncomeItem = '[Constant Income Item] Add',
    AddConstantExpenseItem = '[Constant Expense Item] Add',
    AddPeriodicalVariableItem = '[Perodical Variable Item] Add',
    DeleteConstantIncomeItem = '[Constant Income Item] Delete',
    DeleteConstantExpenseItem = '[Constant Expense Item] Delete',
    DeletePeriodicalVariableItem = '[Perodical Variable Item] Delete',
    DeleteStaticVariableItem = '[Static Variable Item] Delete',
    BulkAddConstantIncomeItem = '[Constant Income Item] Bulk Add',
    BulkAddConstantExpenseItem = '[Constant Expense Item] Bulk Add',
    BulkAddPeriodicalVariableItem = '[Perodical Variable Item] Bulk Add',
    UpdateConstantIncomeItem = '[Constant Income Item] Update',
    UpdateConstantExpenseItem = '[Constant Expense Item] Update',
    UpdatePeriodicalVariableItem = '[Perodical Variable Item] Update',
    UpdateStaticVariableItem = '[Static Variable Item] Update',
    UpdateProjectionName = '[Projection Name] Update',
    UpdateProjectionLastUpdated = '[Projection Last Updated] Update',
    UpdateProjection = '[Update Projection] Update',
    UpdateProjectionFailed = '[Update Projection] Update Failed',
    PostProjection = '[Post Projection] Post',
    PostProjectionSuccess = '[Post Projection] Post Success',
    UpdateSnapShot = '[Update Snapshot] Update',
    AddProjection = '[Add Projection] Add',
    AddSnapShot = '[Add SnapShot] Add',
    DeleteProjection = '[Delete Projection] Delete',
    DeleteProjectionFailed = '[Delete Projection] Delete Failed',
    DeleteProjectionFromSnapshots = '[Delete Projection From Snapshot] Delete',
    DeleteProjectionFromCollection = '[Delete Projection From Collection] Delete',
    SnapShotSelectedUpdateUI = '[Snapshot Selected UI] Update',
    UIUpdateLock = '[UI Update Lock] Update',
    RollBackProjection = '[Projection] RollBack'
}


export class GetAllProjectionSnapshotAction implements Action {
    readonly type = CalDataActionTypes.GetAllProjectionSnapshot;
    constructor(public userId: string) {}
}

export class GetAllProjectionSnapshotActionSuccess implements Action {
    readonly type = CalDataActionTypes.GetAllProjectionSnapshotSuccess;
    constructor(public payload: any) {}
}

export class GetProjectionByIdAction implements Action {
    readonly type = CalDataActionTypes.GetProjectionById;
    constructor(public projectionId: string) {}
}

export class GetProjectionByIdActionSuccess implements Action {
    readonly type = CalDataActionTypes.GetProjectionByIdSuccess;
    constructor(public payload: any) {}
}

export class GetProjectionByIdActionFailed implements Action {
    readonly type = CalDataActionTypes.GetProjectionByIdFailed;
}

export class GetProjectionBatchByIdsAction implements Action {
    readonly type = CalDataActionTypes.GetProjectionBatchByIds;
    constructor(public ids: any[]) {}
}

export class GetProjectionBatchByIdsActionSuccess implements Action {
    readonly type = CalDataActionTypes.GetProjectionBatchByIdsSuccess;
    constructor(public payload: any) {}
}

export class GetProjectionBatchByIdsActionFailed implements Action {
    readonly type = CalDataActionTypes.GetProjectionBatchByIdsFailed;
}

export class AddSnapShotAction implements Action {
    readonly type = CalDataActionTypes.AddSnapShot;
    constructor(public snapshot: Snapshot) {}
}

export class AddProjectionAction implements Action {
    readonly type = CalDataActionTypes.AddProjection;
    constructor(public projectionId: string) {}
}

export class AddConstantIncomeItemAction implements Action {
    readonly type = CalDataActionTypes.AddConstantIncomeItem;
    constructor(public projectionId: string) {}
}

export class AddConstantExpenseItemAction implements Action {
    readonly type = CalDataActionTypes.AddConstantExpenseItem;
    constructor(public projectionId: string) {}
}

export class AddPeriodicalVariableItemAction implements Action {
    readonly type = CalDataActionTypes.AddPeriodicalVariableItem;
    constructor(public projectionId: string) {}
}

export class DeleteProjectionAction implements Action {
    readonly type = CalDataActionTypes.DeleteProjection;
    constructor(public projectionId: string) {}
}

export class DeleteConstantIcomeItemAction implements Action {
    readonly type = CalDataActionTypes.DeleteConstantIncomeItem;
    constructor(public projectionId: string, public itemId: number) {}
}

export class DeleteConstantExpenseItemAction implements Action {
    readonly type = CalDataActionTypes.DeleteConstantExpenseItem;
    constructor(public projectionId: string, public itemId: number) {}
}

export class DeletePeriodicalVariableItemAction implements Action {
    readonly type = CalDataActionTypes.DeletePeriodicalVariableItem;
    constructor(public projectionId: string, public itemId: number) {}
}

export class DeleteStaticVariableItemAction implements Action {
    readonly type = CalDataActionTypes.DeleteStaticVariableItem;
    constructor(public projectionId: string, public itemId: number) {}
}

export class BulkAddConstantIncomeItemAction implements Action {
    readonly type = CalDataActionTypes.BulkAddConstantIncomeItem;
    constructor(public projectionId: string, public payload: StandarItem[]) {}
}

export class BulkAddConstantExpenseItemAction implements Action {
    readonly type = CalDataActionTypes.BulkAddConstantExpenseItem;
    constructor(public projectionId: string, public payload: StandarItem[]) {}
}

export class BulkAddPeriodicalVariableItemAction implements Action {
    readonly type = CalDataActionTypes.BulkAddPeriodicalVariableItem;
    constructor(public projectionId: string, public payload: PeriodicItem[]) {}
}

export class UpdateConstantIncomeItemAction implements Action {
    readonly type = CalDataActionTypes.UpdateConstantIncomeItem;
    constructor(public projectionId: string, public payload: StandarItem) {}
}

export class UpdateConstantExpenseItemAction implements Action {
    readonly type = CalDataActionTypes.UpdateConstantExpenseItem;
    constructor(public projectionId: string, public payload: StandarItem) {}
}

export class UpdatePeriodicalVariableItemAction implements Action {
    readonly type = CalDataActionTypes.UpdatePeriodicalVariableItem;
    constructor(public projectionId: string, public payload: PeriodicItem) {}
}

export class UpdateStaticVariableItemAction implements Action {
    readonly type = CalDataActionTypes.UpdateStaticVariableItem;
    constructor(public projectionId: string, public payload: FixItem) {}
}

export class UpdateProjectionNameAction implements Action {
    readonly type = CalDataActionTypes.UpdateProjectionName;
    constructor(public projectionId: string, public name: string) {}
}

export class UpdateProjectionLastUpdatedAction implements Action {
    readonly type = CalDataActionTypes.UpdateProjectionLastUpdated;
    constructor(public projectionId: string, public lastUpdated: number) {}
}

export class UpdatePorjectionAction implements Action {
    readonly type = CalDataActionTypes.UpdateProjection;
    constructor(public projection: CalData) {}
}

export class PostProjectionAction implements Action {
    readonly type = CalDataActionTypes.PostProjection;
    constructor(public projection: CalData) {}
}

export class PostProjectionActionSuccess implements Action {
    readonly type = CalDataActionTypes.PostProjectionSuccess;
    constructor(public projectionId: string) {}
}

export class UpdatePorjectionActionFailed implements Action {
    readonly type = CalDataActionTypes.UpdateProjectionFailed;
}

export class UpdateSnapShotAction implements Action {
    readonly type = CalDataActionTypes.UpdateSnapShot;
    constructor(public payload: Snapshot) {}
}

export class SnapShotSelectedUpdateUIAction implements Action {
    readonly type = CalDataActionTypes.SnapShotSelectedUpdateUI;
    constructor(public payload: string[]) {}
}

export class DeleteProjectionFromSnapshotAction implements Action {
    readonly type = CalDataActionTypes.DeleteProjectionFromSnapshots;
    constructor(public projectionId: string) {}
}

export class DeleteProjectionFromCollectionAction implements Action {
    readonly type = CalDataActionTypes.DeleteProjectionFromCollection;
    constructor(public projectionId: string) {}
}

export class UIUpdateLockAction implements Action {
    readonly type = CalDataActionTypes.UIUpdateLock;
    constructor(public lock: Lock) {}
}

export class RollBackProjectionAction implements Action {
    readonly type = CalDataActionTypes.RollBackProjection;
    constructor(public payload: CalData) {}
}



export type CalDataActions = GetAllProjectionSnapshotAction | GetAllProjectionSnapshotActionSuccess
 | GetProjectionByIdAction | GetProjectionByIdActionSuccess | GetProjectionByIdActionFailed
 | GetProjectionBatchByIdsAction | GetProjectionBatchByIdsActionSuccess | GetProjectionBatchByIdsActionFailed
 | UpdatePorjectionAction | UpdateProjectionLastUpdatedAction | UpdatePorjectionActionFailed
 | UpdateSnapShotAction | PostProjectionAction | PostProjectionActionSuccess | AddSnapShotAction
 | UpdateConstantIncomeItemAction | UpdateProjectionNameAction
 | UpdateConstantExpenseItemAction | UpdatePeriodicalVariableItemAction
 | UpdateStaticVariableItemAction | AddConstantIncomeItemAction
 | AddConstantExpenseItemAction | AddPeriodicalVariableItemAction
 | AddProjectionAction
 | BulkAddConstantIncomeItemAction | BulkAddConstantExpenseItemAction
 | BulkAddPeriodicalVariableItemAction | DeleteProjectionAction
 | DeleteConstantIcomeItemAction | DeleteConstantExpenseItemAction
 | DeletePeriodicalVariableItemAction | DeleteStaticVariableItemAction
 | SnapShotSelectedUpdateUIAction | DeleteProjectionFromSnapshotAction | DeleteProjectionFromCollectionAction
 | UIUpdateLockAction | RollBackProjectionAction;
