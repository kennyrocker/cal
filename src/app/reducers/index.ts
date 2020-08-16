import * as calData from './calData.reducer';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { CalSnapShot } from 'src/app/constants/interfaces/cal-snap-shot';


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
