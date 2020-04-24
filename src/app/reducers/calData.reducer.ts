import { CalDataActionTypes, CalDataActions } from '../actions/calData.action';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { Entites } from 'src/app/constants/interfaces/entites';


const initialState: Entites = {
    ui: {
        snapshotLoaded: false
    },
    snapshot: [],
    collection: []
};


export function calDataReducer(state = initialState, action: CalDataActions) {

    switch (action.type) {

        /* Get Data */
        case CalDataActionTypes.GetAllProjectionSnapshotSuccess :
            return {
                ...state,
                ui : {
                    ...state.ui,
                    snapshotLoaded: true
                },
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


        /* Add Blank */
        case CalDataActionTypes.AddConstantIncomeItem :
            const constantIncomeItem = { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, active: true };
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantIncome: [
                                constantIncomeItem,
                                ...obj.constantIncome
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.AddConstantExpenseItem :
            const constantExpenseItem = { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, active: true};
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantExpense: [
                                constantExpenseItem,
                                ...obj.constantExpense
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.AddPeriodicalVariableItem :
            const periodicVariableItem = { id: MapperUtil.generateRandomId(), name: '', amount: 0,
                                           cycle: CalCycle.MONTHLY, affectiveMonth: [], active: true };
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            periodicalVariable: [
                                periodicVariableItem,
                                ...obj.periodicalVariable
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };



        /* Delete Single */
        case CalDataActionTypes.DeleteConstantIncomeItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantIncome: obj.constantIncome.filter(i => i.id !== action.itemId)
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.DeleteConstantExpenseItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantExpense: obj.constantExpense.filter(i => i.id !== action.itemId)
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.DeletePeriodicalVariableItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            periodicalVariable: obj.periodicalVariable.filter(i => i.id !== action.itemId)
                        };
                    } else {
                        return obj;
                    }
                })
            };


        case CalDataActionTypes.DeleteStaticVariableItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            staticVariable: obj.staticVariable.filter(i => i.id !== action.itemId)
                        };
                    } else {
                        return obj;
                    }
                })
            };


        /* Add Multi */
        case CalDataActionTypes.BulkAddConstantIncomeItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantIncome: [
                                ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, obj.constantIncome, 'name')
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.BulkAddConstantExpenseItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantExpense: [
                                ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, obj.constantExpense, 'name')
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.BulkAddPeriodicalVariableItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            periodicalVariable: [
                                ...MapperUtil.mergeRemoveDuplicateByKey(action.payload, obj.periodicalVariable, 'name')
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };


        /* Update Single */
        case CalDataActionTypes.UpdateConstantIncomeItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantIncome: obj.constantIncome.map(i => (i.id === action.payload.id) ? action.payload : i)
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.UpdateConstantExpenseItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantExpense: obj.constantExpense.map(i => (i.id === action.payload.id) ? action.payload : i)
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.UpdatePeriodicalVariableItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            periodicalVariable: obj.periodicalVariable.map(i => (i.id === action.payload.id) ? action.payload : i)
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.UpdateProjectionName :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            name: action.name
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.UpdateProjectionLastUpdated :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            lastUpdated: action.lastUpdated
                        }
                    } else {
                        return obj;
                    }
                })
            };    


        /* Fall back */
        default:
            return state;

    }
}
