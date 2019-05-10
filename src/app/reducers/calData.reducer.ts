import { CalDataActionTypes, CalDataActions } from '../actions/calData.action';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';

const initalState: CalData = {};

export function calDataReducer(state = initalState, action: CalDataActions) {

    switch (action.type) {
        // ADD
        case CalDataActionTypes.BulkAddConstantIncomeItem :
          return {
            ...state,
            constantIncome: [
              ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, state.constantIncome, 'name')
            ]
          };

        case CalDataActionTypes.BulkAddConstantExpenseItem :
            return {
                ...state,
                constantExpense: [
                    ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, state.constantExpense, 'name')
                ]
            };

        case CalDataActionTypes.AddConstantIncomeItem :
           return {
                ...state,
                constantIncome: [
                    { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY },
                     ...state.constantIncome
                    ]
            };

        case CalDataActionTypes.AddConstantExpenseItem :
            return {
                ...state,
                constantExpense: [
                    { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY },
                    ...state.constantExpense
                    ]
            };

        case CalDataActionTypes.AddPeriodicalVariableItem :
            return {
                ...state,
                periodicalVarible: [
                    { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, affectiveMonth: [] },
                    ...state.periodicalVarible
                ]
            };

        // UPDATE
        case CalDataActionTypes.UpdateConstantIncomeItem :
            return {
                ...state,
                constantIncome: state.constantIncome.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
            };

        case CalDataActionTypes.UpdateConstantExpenseItem :
            return {
                ...state,
                constantExpense: state.constantExpense.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
            };

        case CalDataActionTypes.UpdatePeriodicalVariableItem :
            return {
                ...state,
                periodicalVarible: state.periodicalVarible.map(obj => (obj.id === action.payload.id) ? action.payload : obj)
            };

        case CalDataActionTypes.UpdateStaticVariableItem :
        // TODO:: logic
        return state;

        // DELETE
        case CalDataActionTypes.DeleteConstantIncomeItem :
            return {
                ...state,
                constantIncome: state.constantIncome.filter(obj => obj.id !== action.itemId)
            };

        case CalDataActionTypes.DeleteConstantExpenseItem :
            return {
                ...state,
                constantExpense: state.constantExpense.filter(obj => obj.id !== action.itemId)
            };

        case CalDataActionTypes.DeletePeriodicalVariableItem :
            return {
                ...state,
                periodicalVarible: state.periodicalVarible.filter(obj => obj.id !== action.itemId)
            };

        case CalDataActionTypes.DeleteStaticVariableItem :
            return {
                ...state,
                staticVariable: state.staticVariable.filter(obj => obj.id !== action.itemId)
            };

        // GET
        case CalDataActionTypes.GetCalDataSuccess :
            return {
                ...state,
                ...action.payload
            };
    }
}
