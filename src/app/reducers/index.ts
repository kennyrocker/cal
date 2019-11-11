import * as calData from './calData.reducer';
import { CalData } from 'src/app/constants/interfaces/cal-data';
import { createFeatureSelector } from '@ngrx/store';

export interface CalDataState {
  calData: CalData;
}

export const reducer: any = {
  calData: calData.calDataReducer
};

export const getCalData: any = (state: CalDataState) => state.calData;

export const displayGetCalData = createFeatureSelector<CalDataState>('display');
export const inputGetCalData = createFeatureSelector<CalDataState>('input');
