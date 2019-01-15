import { Injectable } from '@angular/core';
import { CalData } from '../../constants/interfaces/cal-data';

/* ////////////////////////////// */
/* All Caculation Logic park here */
/* ////////////////////////////// */

@Injectable()
export class CalculateService {

    constructor() {}

    public calculateMonthly(data: CalData): any {
        // TODO:: implement calculation logic
        const mock = [
            {
              "name": "Jan",
              "value": 40632
            },
            {
              "name": "Feb",
              "value": 49737
            },
            {
              "name": "March",
              "value": 36745
            },
            {
              "name": "April",
              "value": 33745
            },
            {
              "name": "May",
              "value": 36240
            },
            {
              "name": "June",
              "value": 33000
            },
            {
              "name": "July",
              "value": 35800
            }
        ];

        return mock;
    }

}
