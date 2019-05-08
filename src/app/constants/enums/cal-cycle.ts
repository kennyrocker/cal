/* /////////////////////  IMPORTANT  ///////////////////// */
/* PeriodCalCycleUI is only for UI, use CalCycle for Logic */
/* /////////////////////////////////////////////////////// */

export enum CalCycle {
    ANNALLY = 1,
    MONTHLY = 12,
    BIWEEKLY = 26
}

export enum PeriodCalCycleUI {
    ONLY_IN_THE_MONTH_OF = 1,  // must be equal to CalCycle.ANNALLY
    AT_MONTHS_OF = 12      // must be equal to CalCycle.MONTHLY
}

export enum StanderItemCycleShortForm {
  a = 1,  // Short for ANNALLY
  m = 12, // Short for MONTHLY
  b = 26  // Short for BIWEEKLY
}
