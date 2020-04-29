import { CalDataActionTypes, CalDataActions } from '../actions/calData.action';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { MapperUtil } from 'src/app/utils/mapper-util';
import { Entites } from 'src/app/constants/interfaces/entites';


const initialState: Entites = {
    ui: {
        snapshotLoaded: false,
        snapshotSelected: []
    },
    snapshot: [],
    collection: []
};

function getNewConstantIncomeItem() {
    return { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, active: true };
}

function getNewConstantExpenseItem() {
    return { id: MapperUtil.generateRandomId(), name: '', amount: 0, cycle: CalCycle.MONTHLY, active: true};
}

function getNewPeriodicVariableItem() {
    return { id: MapperUtil.generateRandomId(), name: '', amount: 0,
             cycle: CalCycle.MONTHLY, affectiveMonth: [], active: true };
}


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

        case CalDataActionTypes.GetProjectionBatchByIdsSuccess:
            return {
                ...state,
                collection: [
                    ...state.collection,
                    ...action.payload
                ]
            };  


        /* Add Blank */
        case CalDataActionTypes.AddProjection :
            const newProjection = {
                id: action.projectionId,
                name: '',
                lastUpdated: new Date().getTime(),
                constantIncome: [ getNewConstantIncomeItem() ],
                constantExpense: [ getNewConstantExpenseItem() ],
                periodicalVariable: [ getNewPeriodicVariableItem() ]
            };
            return {
                ...state,
                collection: [
                    newProjection,
                    ...state.collection
                ]
            };

        case CalDataActionTypes.AddConstantIncomeItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantIncome: [
                                getNewConstantIncomeItem(),
                                ...obj.constantIncome
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.AddConstantExpenseItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            constantExpense: [
                                getNewConstantExpenseItem(),
                                ...obj.constantExpense
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.AddPeriodicalVariableItem :
            return {
                ...state,
                collection: state.collection.map((obj) => {
                    if (obj.id === action.projectionId) {
                        return {
                            ...obj,
                            periodicalVariable: [
                                getNewPeriodicVariableItem(),
                                ...obj.periodicalVariable
                            ]
                        };
                    } else {
                        return obj;
                    }
                })
            };

        case CalDataActionTypes.AddSnapShot :
            return {
                ...state,
                snapshot: [
                    action.snapshot,
                    ...state.snapshot
                ]
            };


        /* Delete Single */
        case CalDataActionTypes.DeleteProjection :
            return {
                ...state,
                collection: state.collection.filter(obj => obj.id !== action.projectionId)
            };

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
        
        case CalDataActionTypes.DeleteProjectionFromSnapshots :
            return {
                ...state,
                snapshot: state.snapshot.filter(i => i.id !== action.projectionId)
            };

        case CalDataActionTypes.DeleteProjectionFromCollection :
            return {
                ...state,
                collection: state.collection.filter(i => i.id !== action.projectionId)
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
        

        /* UI Update*/
        case CalDataActionTypes.SnapShotSelectedUpdateUI :
            return {
                ...state,
                ui: {
                    ...state.ui,
                    snapshotSelected: action.payload
                }
            };


        /* Fall back */
        default:
            return state;

    }
}
