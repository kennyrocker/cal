import { CalDataActionTypes, CalDataActions } from '../actions/calData.action';
import { CalData } from 'src/app/constants/interfaces/cal-data';

const initalState: CalData = {};

export function calDataReducer(state = initalState, action: CalDataActions) {

    switch (action.type) {

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
