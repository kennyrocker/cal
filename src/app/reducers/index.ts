import * as calData from './calData.reducer';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { Snapshot } from 'src/app/constants/interfaces/snapshot';


// TODO:: clean up
export interface CalDataState {
  calData: CalData;
}

export const reducer: any = {
  calData: calData.calDataReducer
};

// TODO:: clean up
export const getCalData: any = (state: CalDataState) => state.calData;

// New
export const getSnapShot: any = (state: any) => state.snapshot;
