import { CalculateService } from './calculate-service';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';

describe('Calculate Service', () => {

    const constantStandarItemBIWEEKLY = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.BIWEEKLY
        },
        {
            id: 2323529,
            name: 'income2',
            amount: 100,
            cycle: CalCycle.BIWEEKLY
        },
        {
            id: 2323529,
            name: 'income2',
            amount: 100,
            cycle: CalCycle.BIWEEKLY
        }
    ];

    const constantStandarItemMONTHLY = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY
        },
    ];

    const constantStandarItemANNALLY = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNALLY
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNALLY
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNALLY
        },
    ];

    const constantStandarItemMixCycle = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNALLY
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.BIWEEKLY
        },
    ];


    const testCalDataInput = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 100,
               cycle: CalCycle.BIWEEKLY
           },
           {
            id: 2323529,
            name: 'income2',
            amount: 200,
            cycle: CalCycle.BIWEEKLY
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

    const testOutput = [
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

    let service: CalculateService;

    beforeEach(() => {
        service = new CalculateService();
    });


    it('#calculateMonthly with test input should expect test output', () => {
        expect(service.calculateMonthly(testCalDataInput)).toEqual(testOutput);
    });


    it('#getStaticTotalOfBiWeeklyCycleConversion with constantStandarItemBIWEEKLY input should expect toatl of 300', () => {
        expect(service.getStaticTotalOfBiWeeklyCycleConversion(constantStandarItemBIWEEKLY)).toEqual(300);
    });

    it('#getStaticTotalOfBiWeeklyCycleConversion with constantStandarItemMONTHLY input should expect toatl of 300 * 12 / 26', () => {
        expect(service.getStaticTotalOfBiWeeklyCycleConversion(constantStandarItemMONTHLY)).toEqual(300 * 12 / 26);
    });

    it('#getStaticTotalOfBiWeeklyCycleConversion with constantStandarItemANNALLY input should expect toatl of 300 / 26', () => {
        expect(service.getStaticTotalOfBiWeeklyCycleConversion(constantStandarItemANNALLY)).toEqual(300 / 26);
    });

    it('#getStaticTotalOfBiWeeklyCycleConversion with constantStandarItemMixCycle input'
        + 'should expect toatl of 100 + (100 * 12 / 26) + (100 / 26)', () => {
        expect(service.getStaticTotalOfBiWeeklyCycleConversion(constantStandarItemMixCycle))
        .toEqual(100 + (100 * 12 / 26) + (100 / 26));
    });



});
