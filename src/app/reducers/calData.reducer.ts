import { CalDataActionTypes, CalDataActions } from '../actions/calData.action';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { Entites } from 'src/app/constants/interfaces/entites';


const initialState: Entites = {
    snapshot: [],
    collection: []
};


export function calDataReducer(state = initialState, action: CalDataActions) {

    switch (action.type) {

        case CalDataActionTypes.GetAllProjectionSnapshotSuccess :
            return {
                ...state,
                snapshot : action.payload
            };

        case CalDataActionTypes.GetProjectionByIdSuccess :
            return {
                ...state,
                collection: [
                    ...state.collection,
                    action.payload
                ]
            };

        case CalDataActionTypes.UpdateSnapShot:
            return {
                ...state,
                snapshot: state.snapshot.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
            };

        default:
            return state;

    }
}








// REFERNCE


// const initialState: CalData = {};

// export function calDataReducer(state = initialState, action: CalDataActions) {

//     switch (action.type) {
//         // ADD
//         case CalDataActionTypes.BulkAddConstantIncomeItem :
//           return {
//             ...state,
//             constantIncome: [
//               ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, state.constantIncome, 'name')
//             ]
//           };

//         case CalDataActionTypes.BulkAddConstantExpenseItem :
//             return {
//                 ...state,
//                 constantExpense: [
//                     ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, state.constantExpense, 'name')
//                 ]
//             };

//         case CalDataActionTypes.BulkAddPeriodicalVariableItem :
//             return {
//                 ...state,
//                 periodicalVariable: [
//                     ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, state.periodicalVariable, 'name')
//                 ]
//             };

//         case CalDataActionTypes.AddConstantIncomeItem :
//            return {
//                 ...state,
//                 constantIncome: [
//                     { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, active: true },
//                      ...state.constantIncome
//                     ]
//             };

//         case CalDataActionTypes.AddConstantExpenseItem :
//             return {
//                 ...state,
//                 constantExpense: [
//                     { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, active: true},
//                     ...state.constantExpense
//                     ]
//             };

//         case CalDataActionTypes.AddPeriodicalVariableItem :
//             return {
//                 ...state,
//                 periodicalVariable: [
//                     { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, affectiveMonth: [], active: true },
//                     ...state.periodicalVariable
//                 ]
//             };

//         // UPDATE
//         case CalDataActionTypes.UpdateConstantIncomeItem :
//             return {
//                 ...state,
//                 constantIncome: state.constantIncome.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
//             };

//         case CalDataActionTypes.UpdateConstantExpenseItem :
//             return {
//                 ...state,
//                 constantExpense: state.constantExpense.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
//             };

//         case CalDataActionTypes.UpdatePeriodicalVariableItem :
//             return {
//                 ...state,
//                 periodicalVariable: state.periodicalVariable.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
//             };

//         case CalDataActionTypes.UpdateStaticVariableItem :
//         // TODO:: logic
//         return state;

//         // DELETE
//         case CalDataActionTypes.DeleteConstantIncomeItem :
//             return {
//                 ...state,
//                 constantIncome: state.constantIncome.filter(obj => obj.id !== action.itemId)
//             };

//         case CalDataActionTypes.DeleteConstantExpenseItem :
//             return {
//                 ...state,
//                 constantExpense: state.constantExpense.filter(obj => obj.id !== action.itemId)
//             };

//         case CalDataActionTypes.DeletePeriodicalVariableItem :
//             return {
//                 ...state,
//                 periodicalVariable: state.periodicalVariable.filter(obj => obj.id !== action.itemId)
//             };

//         case CalDataActionTypes.DeleteStaticVariableItem :
//             return {
//                 ...state,
//                 staticVariable: state.staticVariable.filter(obj => obj.id !== action.itemId)
//             };

//         // GET
//         case CalDataActionTypes.GetCalDataSuccess :
//             return {
//                 ...state,
//                 ...action.payload
//             };
//     }
// }
