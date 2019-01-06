import { CalDataActionTypes, CalDataActions } from '../actions/calData.action';
import { CalData } from 'src/app/constants/interfaces/cal-data';

const initalState: CalData = {};

export function calDataReducer(state = initalState, action: CalDataActions) {
    switch (action.type) {

        case CalDataActionTypes.UpdateConstantExpenseItem :
        // TODO:: logic
        return state;

        case CalDataActionTypes.UpdateConstantExpenseItem :
        // TODO:: logic
        return state;

        case CalDataActionTypes.UpdatePeriodicalVariableItem :
        // TODO:: logic
        return state;

        case CalDataActionTypes.UpdateStaticVariableItem :
        // TODO:: logic
        return state;

        case CalDataActionTypes.GetCalDataSuccess :
            return {
                ...state,
                ...action.payload
            };
    }
}
