
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
               id: 2323523,
               name: 'paycheck',
               amount: 1760,
               cycle: CalCycle.BIWEEKLY
           }
        ],
        constantExpense: [
            {
                id: 2223521,
                name :  'mortage',
                amount : 852,
                cycle : CalCycle.MONTHLY
              },
              {
                id: 2223522,
                name : 'condoFee',
                amount : 390,
                cycle : CalCycle.MONTHLY
              },
              {
                id: 2223523,
                name : 'autoInsurance',
                amount : 179.5,
                cycle : CalCycle.MONTHLY
              },
              {
                id: 2223524,
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
                id: 2223526,
                name   : 'internetBill',
                amount : 56,
                cycle  : CalCycle.MONTHLY
              },
              {
                id: 2223525,
                name   : 'hydroBill',
                amount : 45,
                cycle  : CalCycle.MONTHLY
              },
              {
                id: 2223527,
                name   : 'food',
                amount : 250,
                cycle  : CalCycle.BIWEEKLY
              },
              {
                id: 2223528,
                name : 'gas',
                amount : 154,
                cycle  : CalCycle.MONTHLY
              }
        ],
        periodicalVarible: [
          {
            id: 2223512,
            name : 'auto matainence',
            amount : -70,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [3, 8, 12]
          },
          {
            id: 2223522,
            name : 'taxRefund',
            amount : 1000,
            cycle : CalCycle.ANNALLY,
            affectiveMonth : [4]
          }
        ],
        // staticVariable: [
            // id: 2223522,
            // name : 'taxRefund',
            // amount : 1000,
            // cycle : CalCycle.ANNALLY,
            // affectiveMonth : [4]
        // ]
    };


    public get(): Observable<any> {
        return of(this.mockData);
    }

    public update(content: CalData): Observable<CalData> {
        return of({});
    }
}
