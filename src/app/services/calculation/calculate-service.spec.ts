import { CalculateService } from './calculate-service';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';

describe('Calculate Service', () => {
    const testCalData = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 2000,
               cycle: CalCycle.MONTHLY
           },
           {
            id: 2323529,
            name: 'income2',
            amount: 2000,
            cycle: CalCycle.MONTHLY
        }
        ],
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY
              },
              {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY
              },
              {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY
              }
        ],
        // periodicalVarible: [
        //   {
        //     id: 2223512,
        //     name : 'p1',
        //     amount : -70,
        //     cycle : CalCycle.MONTHLY,
        //     affectiveMonth : [3, 8, 12]
        //   },
        //   {
        //     id: 2223522,
        //     name : 'p2',
        //     amount : 1000,
        //     cycle : CalCycle.ANNALLY,
        //     affectiveMonth : [4]
        //   }
        // ]
    };

    let service: CalculateService;

    beforeEach(() => {
        service = new CalculateService();
    });


    it('#calculateMonthly should, by default, return an empty array', () => {
        expect(service.calculateMonthly(testCalData)).toBeTruthy();
    });

});
