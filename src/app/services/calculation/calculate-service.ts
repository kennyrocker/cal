import { Injectable } from '@angular/core';
import { CalData } from '../../constants/interfaces/cal-data';
import { StandarItem } from 'src/app/constants/interfaces/standar-item';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';
import { DisplaySingleItem } from 'src/app/constants/interfaces/display-single-item';

/* ////////////////////////////// */
/* All Calculation Logic park here */
/* ////////////////////////////// */

@Injectable()
export class CalculateService {

    /* ///////////////////////////////////// */
    /*                 UTILITY               */
    /* ///////////////////////////////////// */

    /* floor to cent, since there no currency for 1/10 of cent .        */
    /* due to this being use frequently in a lot of the sub methods,    */
    /* the acurracy of the between caculation is off by 10 cents        */
    public static roundToCents(input: number): number {
      return Math.floor(input * 100) / 100;
    }

    private isProjectionUnhandle(calData: CalData): boolean {
      return !calData.constantIncome && !calData.constantExpense && !calData.periodicalVariable;
    }

    public isBiWeeklyCycleBelongToTheMonth(week: number, month: number): boolean {
      // 30  days = 1 month
      // 1 biweek = 14 days

      // to see if the by week include in the month
      //  1     2     3     4       5      6       7           8       9       10      11      12
      //  1  2  3  4  5  6  7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26

      // 14 28 42 56 70 84 98 112 126 140 154 168 182 196 210 224 238 252 266 280 294 308 322 336 350 364
      //       30    60    91     121     152     182         212     243     273     304     334     364

      // each year there is 2 month of 3 weeks with bi weekly cycle
      // default 3 weeks months to 6 and 12
      const averageDayOfMonth = 365 / 12;
      const biWeeklyDayOfYear = week * 14;
      const monthlyDayOfYear = month * averageDayOfMonth;
      const previousMonthEndDayOfYear = ((month - 1) < 0) ? averageDayOfMonth : (month - 1) * averageDayOfMonth;
      return monthlyDayOfYear > biWeeklyDayOfYear && previousMonthEndDayOfYear < biWeeklyDayOfYear;
  }

    /* This is base off a very generic week/month separation, not accurate to the calendar */
    public isBiWeekFirstOfMonth(biWeek: number, month: number): boolean {
        return month < 7 && biWeek === ((month * 2) - 1) || month > 6 && biWeek === month * 2;
    }

    /* ///////////////////////////////////// */
    /*          CONSTANT CONVERSION          */
    /* ///////////////////////////////////// */

    public getConstantSumWithBiWeeklyConversion(items: StandarItem[]): number {
      if (!items || items.length === 0) {
        return 0;
      }
      let total = 0;
      for (let i = 0;  i < items.length; i++) {
        if (items[i].active === false) {
          continue;
        }
        if (items[i].cycle === CalCycle.BIWEEKLY) {
          total += items[i].amount;
        }
        if (items[i].cycle === CalCycle.MONTHLY) {
          total += (items[i].amount * CalCycle.MONTHLY / CalCycle.BIWEEKLY);
        }
        if (items[i].cycle === CalCycle.ANNUALLY) {
          total += (items[i].amount / CalCycle.BIWEEKLY);
        }
      }
      return CalculateService.roundToCents(total);
    }

    public getConstantSumWithMonthlyConversion(items: StandarItem[]): number {
      if (!items || items.length === 0) {
          return 0;
      }
      let total = 0;
      for (let i = 0;  i < items.length; i++) {
        if (items[i].active === false) {
          continue;
        }
        if (items[i].cycle === CalCycle.BIWEEKLY) {
          total += Number(items[i].amount) * CalCycle.BIWEEKLY / CalCycle.MONTHLY;
        }
        if (items[i].cycle === CalCycle.MONTHLY) {
          total += Number(items[i].amount);
        }
        if (items[i].cycle === CalCycle.ANNUALLY) {
          total += Number(items[i].amount) / CalCycle.MONTHLY;
        }
      }
      return CalculateService.roundToCents(total);
    }

    public getConstantSumWithAnnuallyConversion(items: StandarItem[]): number {
        if (!items || items.length === 0) {
          return 0;
        }
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].active === false) {
              continue;
            }
            if (items[i].cycle === CalCycle.BIWEEKLY) {
                total += (items[i].amount * CalCycle.BIWEEKLY );
            }
            if (items[i].cycle === CalCycle.MONTHLY) {
                total += (items[i].amount * CalCycle.MONTHLY);
            }
            if (items[i].cycle === CalCycle.ANNUALLY) {
                total += items[i].amount;
            }
        }
        return CalculateService.roundToCents(total);
    }

    /* ///////////////////////////////////// */
    /*          PERIODIC CONVERSION          */
    /* ///////////////////////////////////// */

    public getPeriodicSumWithMonthlyConverstion(items: PeriodicItem[], monthOfYear: number): number {
        if (!items || items.length === 0 || monthOfYear < 1) {
          return 0;
        }
        let balance = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].active === false) {
              continue;
            }
            const itemAmount = items[i].amount;
            if (items[i].cycle === CalCycle.MONTHLY) {
               const months = items[i].affectiveMonth;
               for (let j = 0; j < months.length; j++) { // TODO:: improve O(n^2)
                  if (months[j] === monthOfYear) {
                    balance += itemAmount;
                  }
               }
            }
            if (items[i].cycle === CalCycle.ANNUALLY) {
                if (items[i].affectiveMonth[0] === monthOfYear) {
                    balance += itemAmount;
                }
            }
        }
        return CalculateService.roundToCents(balance);
    }

    public getPeriodicSumWithAnnuallyConverstion(items: PeriodicItem[]): number {
        if (!items || items.length === 0) {
          return 0;
        }
        let balance = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].active === false) {
              continue;
            }
            if (items[i].cycle === CalCycle.ANNUALLY) {
                balance += items[i].amount;
            }
            if (items[i].cycle === CalCycle.MONTHLY) {
                balance += (items[i].amount * items[i].affectiveMonth.length);
            }
        }
        return CalculateService.roundToCents(balance);
    }

    public getPeriodicSumWithBiweeklyConvertsion(items: PeriodicItem[], biWeekOfYear: number): number {
        if (!items || items.length === 0) {
          return 0;
        }
        let balance = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].active === false) {
              continue;
            }
            // monthly
            if (items[i].cycle === CalCycle.MONTHLY) {
                for (let j = 0; j < items[i].affectiveMonth.length; j++) { // TODO:: improve O(n^2)
                   const month = items[i].affectiveMonth[j];
                   if (this.isBiWeeklyCycleBelongToTheMonth(biWeekOfYear, month)) {
                        // each year there is 2 month of 3 weeks with bi weekly cycle
                        // default 3 weeks months to 6 and 12
                        const itemAmount = (month === 6 || month === 12) ? (items[i].amount / 3) : (items[i].amount / 2);
                        balance += itemAmount;
                   }
                }
            }
            // annually
            if (items[i].cycle === CalCycle.ANNUALLY) {
                const month = items[i].affectiveMonth[0];
                if (this.isBiWeekFirstOfMonth(biWeekOfYear, month)) {
                    balance += items[i].amount;
                }
            }
        }
        return CalculateService.roundToCents(balance);
    }

    /* ///////////////////////////////////// */
    /*         PROJECTION WITH CYCLE         */
    /* ///////////////////////////////////// */

    public getMonthlyProjection(initBalance: number, startingMonthOfYear: number,
                                numberOfMonths: number, calData: CalData): DisplaySingleItem[] {

        if (this.isProjectionUnhandle(calData)) {
            return [];
        }

        if (numberOfMonths < 1) {
            return [];
        }

        const output: DisplaySingleItem[] = [];
        const monthlyIncomeBalance = this.getConstantSumWithMonthlyConversion(calData.constantIncome);
        const monthlyExpenseBalance = this.getConstantSumWithMonthlyConversion(calData.constantExpense);
        const monthlyConstantBalance = monthlyIncomeBalance - monthlyExpenseBalance;
        let balance = initBalance ? initBalance : 0;
        for (let i = startingMonthOfYear; i < (startingMonthOfYear + numberOfMonths); i++) {
            let month = i;
            if (i > CalCycle.MONTHLY) {
                month = i % CalCycle.MONTHLY;
            }
            const cyclePeriodicBalance = this.getPeriodicSumWithMonthlyConverstion(calData.periodicalVariable, month);
            balance += (monthlyConstantBalance + cyclePeriodicBalance);
            const displayItem = {
                name: month.toString(),
                value: CalculateService.roundToCents(balance)
            };
            output.push(displayItem);
        }
        return output;
    }

    public getAnnuallyProjection(initBalance: number, numberOfYears: number, calData: CalData): DisplaySingleItem[] {

        if (this.isProjectionUnhandle(calData)) {
          return [];
        }
        if (numberOfYears < 1) {
          return [];
        }
        const output: DisplaySingleItem[] = [];
        const annalConstantIncome = this.getConstantSumWithAnnuallyConversion(calData.constantIncome);
        const annalConstantExpense = this.getConstantSumWithAnnuallyConversion(calData.constantExpense);
        const annalConstantBalance = annalConstantIncome - annalConstantExpense;
        let balance = initBalance ? initBalance : 0;
        for (let i = 0; i < numberOfYears; i++) {
            const annalPeriodicalBalance = this.getPeriodicSumWithAnnuallyConverstion(calData.periodicalVariable);
            balance += (annalConstantBalance + annalPeriodicalBalance);
            const displayItem = {
                name: (i + 1).toString(),
                value: CalculateService.roundToCents(balance)
            };
            output.push(displayItem);
        }
        return output;
    }

    public getBiWeeklyProjection(initBalance: number, startingWeekOfYear: number,
                                 numberOfWeeks: number, calData: CalData): DisplaySingleItem[] {

        if (this.isProjectionUnhandle(calData)) {
          return [];
        }
        if (numberOfWeeks < 1) {
          return [];
        }
        const output: DisplaySingleItem[] = [];
        const biweeklyIncomeBalance = this.getConstantSumWithBiWeeklyConversion(calData.constantIncome);
        const biweeklyExpenseBalance = this.getConstantSumWithBiWeeklyConversion(calData.constantExpense);
        const biweeklyConstantBalance = biweeklyIncomeBalance - biweeklyExpenseBalance;
        let balance = initBalance ? initBalance : 0;
        for (let i = startingWeekOfYear; i < (startingWeekOfYear + numberOfWeeks); i++) {
            let week = i;
            if (i > CalCycle.BIWEEKLY) {
                week = i % CalCycle.BIWEEKLY;
            }
            const cyclePeriodicBalance = this.getPeriodicSumWithBiweeklyConvertsion(calData.periodicalVariable, week);
            balance += (biweeklyConstantBalance + cyclePeriodicBalance);
            const displayItem = {
              name: week.toString(),
              value: CalculateService.roundToCents(balance)
            };
            output.push(displayItem);
        }
        return output;
    }

  }
