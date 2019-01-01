import * as calData from './calData.reducer';
import { CalData } from 'src/app/constants/interfaces/cal-data';

export interface CalDataState {
    calData: CalData;
}

export const reducer: any = {
    calData: calData.calDataReducer
};

export const getCalData: any = (state: CalDataState) => state.calData;
