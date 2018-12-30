
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CalCycle } from '../constants/enums/cal-cycle';
import { CalData } from 'src/app/constants/interfaces/cal-data';

@Injectable()
export class CalDataService {
    constructor() {}
    // TOOD:: remove this when api hook up
    mockData = {
        constantIncome : [
           {
               name: 'paycheck',
               amount: 1760,
               cycle: CalCycle.BIWEEKLY
           }
        ],
        constantExpense: [
            {
                name :  'mortage',
                amount : 852,
                cycle : CalCycle.MONTHLY
              },
              {
                name : 'condoFee',
                amount : 390,
                cycle : CalCycle.MONTHLY
              },
              {
                name : 'autoInsurance',
                amount : 179.5,
                cycle : CalCycle.MONTHLY
              },
              {
                name : 'homeInsurance',
                amount : 26.6,
                cycle  : CalCycle.MONTHLY
              },
              {
                name   : 'cellPhoneBill',
                amount : 90,
                cycle  : CalCycle.MONTHLY
              },
              {
                name   : 'internetBill',
                amount : 56,
                cycle  : CalCycle.MONTHLY
              },
              {
                name   : 'hydroBill',
                amount : 45,
                cycle  : CalCycle.MONTHLY
              },
              {
                name   : 'food',
                amount : 250,
                cycle  : CalCycle.BIWEEKLY
              },
              {
                name : 'gas',
                amount : 154,
                cycle  : CalCycle.MONTHLY
              }
        ],
        periodicalVarible: [
          {
            name : 'auto matainence',
            amount : -70,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [3, 8, 12]
          },
          {
            name : 'taxRefund',
            amount : 1000,
            cycle : CalCycle.ANNALLY,
            affectiveMonth : [4]
          }
        ],
        // staticVariable: [

        // ]
    };


    public get(): Observable<CalData> {
        return of(this.mockData);
    }

    public update(content: CalData): Observable<CalData> {
        return of({});
    }
}
