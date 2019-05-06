import { Injectable } from '@angular/core';
import { CalData } from '../../constants/interfaces/cal-data';
import { StandarItem } from 'src/app/constants/interfaces/standar-item';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';
import { DisplayItem } from 'src/app/constants/interfaces/display-item';

/* ////////////////////////////// */
/* All Caculation Logic park here */
/* ////////////////////////////// */

@Injectable()
export class CalculateService {

    /* ///////////////////////////////////// */
    /*                 UTILITY               */
    /* ///////////////////////////////////// */
    
    /* floor to cent, since there no currency for 1/10 of cent .        */
    /* due to this being use frequently in a lot of the sub methods,    */
    /* the acurracy of the between caculation is off by 10 cents        */
    public roundToCents(input: number): number {
      return Math.floor(input * 100) / 100;
    }

    private isProjectionUnhandle(calData: CalData): boolean {
      return !calData.constantIncome && !calData.constantExpense && !calData.periodicalVarible;
    }

    public isBiWeeklyCycleBelongToTheMonth(week: number, month: number): boolean {
        // 30.41 days = 1 month
        // 1 biweek = 14 days
        // to see if the by week include in the month
        //  1  2  3  4  5  6  7   8   9  10  11  12  13  14  15  16  17  18  19  20  21  22  23  24  25  26
        // 14 28 42 56 70 84 98 112 126 140 154 168 182 196 210 224 238 252 266 280 294 308 322 336 350 364
        // 30.41 60.82 91.23 121.64 152.05 182.46 212.87 243.28 273.69 304.10 334.51 364.92
        
        // each year there is 2 month of 3 weeks with bi weekly cycle
        // default 3 weeks months to 7 and 12
        let biWeeklyDayOfYear = week * 14;
        let monthlyDayOfYear = month * 365 / 12;
        let previousMonthEndDayOfYear = ((month - 1) < 0) ? (365 / 12) : (month - 1) * (365 / 12);
        return (monthlyDayOfYear > biWeeklyDayOfYear) && (previousMonthEndDayOfYear < biWeeklyDayOfYear);
    }

    public isWeekFirstOfMonth(week: number, month: number): boolean {
        if ((week == 1 && month == 1) 
        || (week == 3 && month == 2) 
        || (week == 5 && month == 3)
        || (week == 7 && month == 4)
        || (week == 9 && month == 5)
        || (week == 11 && month == 6)
        || (week == 14 && month == 7)
        || (week == 16 && month == 8)
        || (week == 18 && month == 9)
        || (week == 20 && month == 10)
        || (week == 22 && month == 11)
        || (week == 24 && month == 12)) return true;
        return false;
    }

    /* ///////////////////////////////////// */
    /*          CONSTANT CONVERSION          */
    /* ///////////////////////////////////// */

    public getConstantSumWithBiWeeklyConversion(items: StandarItem[]): number {
      if (!items || items.length === 0) return 0;
      let total = 0;
      for (let i = 0;  i < items.length; i++) {
        if (items[i].cycle === CalCycle.BIWEEKLY) {
          total += items[i].amount;
        }
        if (items[i].cycle === CalCycle.MONTHLY) {
          total += (items[i].amount * CalCycle.MONTHLY / CalCycle.BIWEEKLY);
        }
        if (items[i].cycle === CalCycle.ANNALLY) {
          total += (items[i].amount / CalCycle.BIWEEKLY);
        }
      }
      return this.roundToCents(total);
    }

    public getConstantSumWithMonthlyConversion(items: StandarItem[]): number {
      if (!items || items.length === 0) {
          return 0;
      }
      let total = 0;
      for (let i = 0;  i < items.length; i++) {
        if (items[i].cycle === CalCycle.BIWEEKLY) {
          total = parseFloat((total + (items[i].amount * CalCycle.BIWEEKLY / CalCycle.MONTHLY)).toString());
        }
        if (items[i].cycle === CalCycle.MONTHLY) {
          total = parseFloat((total + items[i].amount).toString());
        }
        if (items[i].cycle === CalCycle.ANNALLY) {
          total = parseFloat((total + (items[i].amount / CalCycle.MONTHLY)).toString());
        }
      }
      return this.roundToCents(total);
    }

    public getConstantSumWithAnnallyConversion(items: StandarItem[]): number {
        if (!items || items.length === 0) return 0;
        let total = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].cycle === CalCycle.BIWEEKLY) {
                total += (items[i].amount * CalCycle.BIWEEKLY );
            } 
            if (items[i].cycle === CalCycle.MONTHLY) {
                total += (items[i].amount * CalCycle.MONTHLY);
            } 
            if (items[i].cycle === CalCycle.ANNALLY) {
                total += items[i].amount;
            }
        }
        return this.roundToCents(total);
    };

    /* ///////////////////////////////////// */
    /*          PERIODIC CONVERSION          */
    /* ///////////////////////////////////// */
    
    public getPeriodicSumWithMonthlyConverstion(items: PeriodicItem[], monthOfYear: number): number {
        if (!items || items.length === 0 || monthOfYear < 1) return 0;
        let balance = 0;
        for (let i = 0; i < items.length; i++) {
            let itemAmount = items[i].amount;
            if (items[i].cycle === CalCycle.MONTHLY) {
               let months = items[i].affectiveMonth;
               for (let j = 0; j < months.length; j++) {
                  if (months[j] === monthOfYear) {
                    balance += itemAmount;
                  }
               }
            }
            if (items[i].cycle === CalCycle.ANNALLY) {
                if (items[i].affectiveMonth[0] === monthOfYear) {
                    balance += itemAmount;
                }
            }
        }
        return this.roundToCents(balance);
    }

    public getPeriodicSumWithAnnallyConverstion(items: PeriodicItem[]): number {
        if (!items || items.length === 0) return 0;
        let balance = 0;
        for (let i = 0; i < items.length; i++) {
            if (items[i].cycle === CalCycle.ANNALLY) {
                balance += items[i].amount;
            }
            if (items[i].cycle === CalCycle.MONTHLY) {
                balance += (items[i].amount * items[i].affectiveMonth.length);
            }
        }
        return this.roundToCents(balance);
    }

    public getPeriodicSumWithBiweeklyConvertsion(items: PeriodicItem[], biWeekOfYear: number): number {
        if(!items || items.length === 0) return 0;
        let balance = 0;

        for (let i = 0; i < items.length; i++) {
            // monthly
            if (items[i].cycle === CalCycle.MONTHLY) {
                for (let j = 0; j < items[i].affectiveMonth.length; j++) {
                   const month = items[i].affectiveMonth[j];
                   if (this.isBiWeeklyCycleBelongToTheMonth(biWeekOfYear, month)) {
                        // each year there is 2 month of 3 weeks with bi weekly cycle
                        // default 3 weeks months to 7 and 12
                        const itemAmount = (month === 7 || month === 12) ? (items[i].amount / 3) : (items[i].amount / 2);
                        balance += itemAmount;
                   }
                }
            }
            // annally
            if (items[i].cycle === CalCycle.ANNALLY) {
                const month = items[i].affectiveMonth[0];
                if (this.isWeekFirstOfMonth(biWeekOfYear, month)) {
                    balance += items[i].amount;
                }
            }
        }

        return this.roundToCents(balance);
    }

    /* ///////////////////////////////////// */
    /*         PROJECTION WITH CYCLE         */
    /* ///////////////////////////////////// */

    public getMonthlyProjection(initBalance: number, startingMonthOfYear: number,
                                numberOfMonths: number, calData: CalData): DisplayItem[] {

        if (this.isProjectionUnhandle(calData)) {
            return [];
        }

        if (numberOfMonths < 1) {
            return [];
        }

        const output: DisplayItem[] = [];
        let balance = initBalance ? initBalance : 0;
        const monthlyIncomeBalance = this.getConstantSumWithMonthlyConversion(calData.constantIncome);
        const monthlyExpenseBalance = this.getConstantSumWithMonthlyConversion(calData.constantExpense);
        const monthlyConstantBalance = parseFloat((monthlyIncomeBalance - monthlyExpenseBalance).toString());
        for (let i = startingMonthOfYear; i < (startingMonthOfYear + numberOfMonths); i++) {
            let month = i;
            if (i > CalCycle.MONTHLY) {
                month = i % CalCycle.MONTHLY;
            }
            const cyclePeriodicBalance = this.getPeriodicSumWithMonthlyConverstion(calData.periodicalVarible, month);
            balance = parseFloat((balance + monthlyConstantBalance + cyclePeriodicBalance).toString());
            const displayItem = {
                name: month.toString(),
                value: this.roundToCents(balance)
            };
            output.push(displayItem);
        }
        return output;
    }

    public getAnnallyProjection(initBalance: number, numberOfYears: number, calData: CalData): DisplayItem[] {

        if (this.isProjectionUnhandle(calData)) return [];
        if (numberOfYears < 1) return [];
       
        let output: DisplayItem[] = [];
        let balance = initBalance ? initBalance : 0;

        let annalConstantIncome = this.getConstantSumWithAnnallyConversion(calData.constantIncome);
        let annalConstantExpense = this.getConstantSumWithAnnallyConversion(calData.constantExpense);
        let annalConstantBalance = annalConstantIncome - annalConstantExpense;

        for (let i = 0; i < numberOfYears; i++) {
            let annalPeriodicalBalance = this.getPeriodicSumWithAnnallyConverstion(calData.periodicalVarible);
            balance += (annalConstantBalance + annalPeriodicalBalance);
            let displayItem = {
                name: (i + 1).toString(),
                value: balance
            };
            output.push(displayItem);
        }
        return output;
    }

    public getBiWeeklyProjection(initBalance: number, startingWeekOfYear: number,
                                 numberOfWeeks: number, calData: CalData): DisplayItem[] {
        
        if (this.isProjectionUnhandle(calData)) return [];
        if (numberOfWeeks < 1) return [];

        let output: DisplayItem[] = [];
        let balance = initBalance ? initBalance : 0;

        let biweeklyIncomeBalance = this.getConstantSumWithBiWeeklyConversion(calData.constantIncome);
        let biweeklyExpenseBalance = this.getConstantSumWithBiWeeklyConversion(calData.constantExpense);
        let biweeklyConstantBalance = biweeklyIncomeBalance - biweeklyExpenseBalance;

        for (let i = startingWeekOfYear; i < (startingWeekOfYear + numberOfWeeks); i++) {
            let week = i;
            if (i > CalCycle.BIWEEKLY) {
                week = i % CalCycle.BIWEEKLY;
            }
            let cyclePeriodicBalance = this.getPeriodicSumWithBiweeklyConvertsion(calData.periodicalVarible, week);
            balance += this.roundToCents(biweeklyConstantBalance + cyclePeriodicBalance);
            let displayItem = {
              name: week.toString(),
              value: balance
            };
            output.push(displayItem);
        }                          
        return output;
    }

  }
