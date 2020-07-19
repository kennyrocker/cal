import { CalculateService } from './calculate-service';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';

describe('Calculate Service', () => {

    // Data setup

    const constantStandarItemBIWEEKLY = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100.51,
            cycle: CalCycle.BIWEEKLY,
            active: true
        },
        {
            id: 2323529,
            name: 'income2',
            amount: 100.49,
            cycle: CalCycle.BIWEEKLY,
            active: true
        },
        {
            id: 2323529,
            name: 'income2',
            amount: 100.50,
            cycle: CalCycle.BIWEEKLY,
            active: true
        }
    ];

    const constantStandarItemMONTHLY = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY,
            active: true
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY,
            active: true
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY,
            active: true
        },
    ];

    const constantStandarItemANNUALLY = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNUALLY,
            active: true
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNUALLY,
            active: true
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.ANNUALLY,
            active: true
        },
    ];

    const constantStandarItemMixCycle = [
        {
            id: 2323523,
            name: 'income1',
            amount: 100.49,
            cycle: CalCycle.MONTHLY,
            active: true
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100.51,
            cycle: CalCycle.ANNUALLY,
            active: true
        },
        {
            id: 2323523,
            name: 'income1',
            amount: 100.50,
            cycle: CalCycle.BIWEEKLY,
            active: true
        },
    ];

    const constantStandarItemEmpty = [];

    const periodicalVarible = [
        {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
        },
        {
            id: 2223522,
            name : 'p2',
            amount : 100,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
        },
        {
            id: 2223522,
            name : 'p3',
            amount : 100,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [8],
            active: true
        }
    ];

    const fullInput = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 100,
               cycle: CalCycle.MONTHLY,
               active: true
           },
           {
               id: 2323529,
               name: 'income2',
               amount: 200,
               cycle: CalCycle.MONTHLY,
               active: true
           }
        ],
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            }
        ],
        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          }
        ]
    };

    const fullOutput = [
        {
            name: '1',
            value: -100
        },
        {
            name: '2',
            value: -200
        },
        {
            name: '3',
            value: -300
        },
        {
            name: '4',
            value: 0
        }
    ];

    const noConstantIncomeInput = {
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            }
        ],
        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          }
        ]
    };

    const noConstantIncomeOutput = [
        {
            name: '1',
            value: -400
        },
        {
            name: '2',
            value: -800
        },
        {
            name: '3',
            value: -1200
        },
        {
            name: '4',
            value: -1200
        }
    ];

    const noConstantExpenseInput = {
        constantIncome : [
            {
                id: 2323523,
                name: 'income1',
                amount: 100,
                cycle: CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2323529,
                name: 'income2',
                amount: 200,
                cycle: CalCycle.MONTHLY,
                active: true
            }
        ],
        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          }
        ]
    };

    const noConstantExpenseOutput = [
        {
            name: '1',
            value: 200
        },
        {
            name: '2',
            value: 400
        },
        {
            name: '3',
            value: 600
        },
        {
            name: '4',
            value: 1200
        }
    ];

    const noPeriodicInput = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 100,
               cycle: CalCycle.MONTHLY,
               active: true
           },
           {
               id: 2323529,
               name: 'income2',
               amount: 200,
               cycle: CalCycle.MONTHLY,
               active: true
           }
        ],
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            }
        ]
    };

    const noPeriodicOutput = [
        {
            name: '1',
            value: 0
        },
        {
            name: '2',
            value: 0
        },
        {
            name: '3',
            value: 0
        },
        {
            name: '4',
            value: 0
        }
    ];

    const fullAnnalInput = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 100,
               cycle: CalCycle.MONTHLY,
               active: true
           },
           {
               id: 2323529,
               name: 'income2',
               amount: 200,
               cycle: CalCycle.MONTHLY,
               active: true
           }
        ],
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            }
        ],
        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [7],
            active: true
          }
        ]
    };

    const fullAnnalOutput = [
        {
            name: '1',
            value: 300
        },
        {
            name: '2',
            value: 600
        },
        {
            name: '3',
            value: 900
        },
        {
            name: '4',
            value: 1200
        }
    ];

    const fullAnnalNoPeriodicInput = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 100,
               cycle: CalCycle.MONTHLY,
              active: true
           },
           {
              id: 2323529,
              name: 'income2',
              amount: 200,
              cycle: CalCycle.MONTHLY,
              active: true
           }
        ],
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
            }
        ]
    };

    const fullAnnalNoPeriodicOutput = [
        {
            name: '1',
            value: 0
        },
        {
            name: '2',
            value: 0
        },
        {
            name: '3',
            value: 0
        },
        {
            name: '4',
            value: 0
        }
    ];

    const fullAnnalNoConstantIncomeInput = {
        constantExpense: [
            {
                id: 2223521,
                name :  'expense1',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
              },
              {
                id: 2223522,
                name : 'expense2',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
              },
              {
                id: 2225652,
                name : 'expense3',
                amount : 100,
                cycle : CalCycle.MONTHLY,
                active: true
              }
        ],
        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [7],
            active: true
          }
        ]
    };

    const fullAnnalNoConstantIncomeOutput = [
        {
            name: '1',
            value: -3300
        },
        {
            name: '2',
            value: -6600
        },
        {
            name: '3',
            value: -9900
        },
        {
            name: '4',
            value: -13200
        }
    ];

    const fullAnnalNoConstantExpenseInput = {
        constantIncome : [
           {
               id: 2323523,
               name: 'income1',
               amount: 100,
               cycle: CalCycle.MONTHLY,
               active: true
           },
           {
               id: 2323529,
               name: 'income2',
               amount: 200,
               cycle: CalCycle.MONTHLY,
               active: true
           }
        ],
        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [7],
            active: true
          }
        ]
    };

    const fullAnnalNoConstantExpenseOutput = [
        {
            name: '1',
            value: 3900
        },
        {
            name: '2',
            value: 7800
        },
        {
            name: '3',
            value: 11700
        },
        {
            name: '4',
            value: 15600
        }
    ];


    const fullBiWeekNoPeriodicInput = {
        constantIncome : [
            {
                id: 2323523,
                name: 'income1',
                amount: 100,
                cycle: CalCycle.MONTHLY,
                active: true
            },
            {
                id: 2323529,
                name: 'income2',
                amount: 200,
                cycle: CalCycle.MONTHLY,
                active: true
            }
         ],
         constantExpense: [
             {
                 id: 2223521,
                 name :  'expense1',
                 amount : 100,
                 cycle : CalCycle.MONTHLY,
                 active: true
             },
             {
                 id: 2223522,
                 name : 'expense2',
                 amount : 100,
                 cycle : CalCycle.MONTHLY,
                 active: true
             },
             {
                 id: 2225652,
                 name : 'expense3',
                 amount : 100,
                 cycle : CalCycle.MONTHLY,
                 active: true
             }
         ]
    };

    const fullBiWeekNoPeriodicOutput = [
        {
            name: '1',
            value: 0
        },
        {
            name: '2',
            value: 0
        },
        {
            name: '3',
            value: 0
        },
        {
            name: '4',
            value: 0
        },
    ];

    const fullBiWeekNoPeriodicInput2 = {
        constantIncome : [
            {
                id: 2323523,
                name: 'income1',
                amount: 100,
                cycle: CalCycle.ANNUALLY,
                active: true
            },
            {
                id: 2323529,
                name: 'income2',
                amount: 200,
                cycle: CalCycle.BIWEEKLY,
                active: true
            }
         ],
         constantExpense: [
             {
                 id: 2223521,
                 name :  'expense1',
                 amount : 100,
                 cycle : CalCycle.ANNUALLY,
                 active: true
             },
             {
                 id: 2223522,
                 name : 'expense2',
                 amount : 100,
                 cycle : CalCycle.BIWEEKLY,
                 active: true
             },
             {
                 id: 2225652,
                 name : 'expense3',
                 amount : 100,
                 cycle : CalCycle.BIWEEKLY,
                 active: true
             }
         ]
    };

    const biWeeklyNoConstantInput = {

        periodicalVariable: [
          {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
          },
          {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [1],
            active: true
          }
        ]
    };

    const biWeeklyNoConstantOutput = [
        {
            name: '1',
            value: 250
        },
        {
            name: '2',
            value: 200
        },
        {
            name: '3',
            value: 150
        },
        {
            name: '4',
            value: 100
        },{
            name: '5',
            value: 50
        },
        {
            name: '6',
            value: 0
        },
        {
            name: '7',
            value: 300
        },
        {
            name: '8',
            value: 300
        },
        {
            name: '9',
            value: 300
        },
    ];

    const biWeeklyPeriodicMonth6and12Input = {
        periodicalVariable: [
          {
            id: 22235123,
            name : 'test',
            amount : 10,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [6, 12],
            active: true
          }
        ]
    };

    const biWeeklyPeriodicMonth6and12InputOutput = [
        {
            name: '1',
            value: 0
        },
        {
            name: '2',
            value: 0
        },
        {
            name: '3',
            value: 0
        },
        {
            name: '4',
            value: 0
        },{
            name: '5',
            value: 0
        },
        {
            name: '6',
            value: 0
        },
        {
            name: '7',
            value: 0
        },
        {
            name: '8',
            value: 0
        },
        {
            name: '9',
            value: 0
        },
        {
            name: '10',
            value: 0
        },
        {
            name: '11',
            value: 3.33
        },
        {
            name: '12',
            value: 6.66
        },
        {
            name: '13',
            value: 9.99
        },
        {
            name: '14',
            value: 9.99
        },{
            name: '15',
            value: 9.99
        },
        {
            name: '16',
            value: 9.99
        },
        {
            name: '17',
            value: 9.99
        },
        {
            name: '18',
            value: 9.99
        },
        {
            name: '19',
            value: 9.99
        },
        {
            name: '20',
            value: 9.99
        },
        {
            name: '21',
            value: 9.99
        },
        {
            name: '22',
            value: 9.99
        },
        {
            name: '23',
            value: 9.99
        },
        {
            name: '24',
            value: 13.32
        },{
            name: '25',
            value: 16.64
        },
        {
            name: '26',
            value: 19.97
        }
    ];


    const fullInputWithInactive = {
        constantIncome : [
        {
            id: 2323523,
            name: 'income1',
            amount: 100,
            cycle: CalCycle.MONTHLY,
            active: false
        },
        {
            id: 2323529,
            name: 'income2',
            amount: 200,
            cycle: CalCycle.MONTHLY,
            active: true
        }
        ],
        constantExpense: [
        {
            id: 2223521,
            name :  'expense1',
            amount : 100,
            cycle : CalCycle.MONTHLY,
            active: true
        },
        {
            id: 2223522,
            name : 'expense2',
            amount : 100,
            cycle : CalCycle.MONTHLY,
            active: true
        },
        {
            id: 2225652,
            name : 'expense3',
            amount : 100,
            cycle : CalCycle.MONTHLY,
            active: true
        }
        ],
        periodicalVariable: [
        {
            id: 2223512,
            name : 'p1',
            amount : -100,
            cycle : CalCycle.MONTHLY,
            affectiveMonth : [1, 2, 3],
            active: true
        },
        {
            id: 2223522,
            name : 'p2',
            amount : 300,
            cycle : CalCycle.ANNUALLY,
            affectiveMonth : [4],
            active: true
        }
        ]
    };

    const fullOutputWithInactive = [
        {
        name: '1',
        value: -200
        },
        {
        name: '2',
        value: -400
        },
        {
        name: '3',
        value: -600
        },
        {
        name: '4',
        value: -400
        }
    ];

    // Setup
    let service: CalculateService;

    beforeEach(() => {
        service = new CalculateService();
    });


    /* ///////////////////////////////////// */
    /*                ROUNDING               */
    /* ///////////////////////////////////// */

    it('#roundToCents with 0 should return 0', () => {
        expect(CalculateService.roundToCents(0)).toEqual(0);
    });

    it('#roundToCents with 45.499 should return 45.49', () => {
        expect(CalculateService.roundToCents(45.499)).toEqual(45.49);
    });

    it('#roundToCents with 1245.49434 should return 1245.49', () => {
        expect(CalculateService.roundToCents(1245.49434)).toEqual(1245.49);
    });

    it('#roundToCents with 1245.49934 should return 1245.49', () => {
        expect(CalculateService.roundToCents(1245.49934)).toEqual(1245.49);
    });

    it('#isBiWeeklyCycleBelongToTheMonth with 1 as week and 1 as month should return true', () => {
        expect(service.isBiWeeklyCycleBelongToTheMonth(1, 1)).toBeTruthy();
    });

    it('#isBiWeeklyCycleBelongToTheMonth with 2 as week and 1 as month should return true', () => {
        expect(service.isBiWeeklyCycleBelongToTheMonth(2, 1)).toBeTruthy();
    });

    it('#isBiWeeklyCycleBelongToTheMonth with 2 as week and 2 as month should return false', () => {
        expect(service.isBiWeeklyCycleBelongToTheMonth(2, 2)).toBeFalsy();
    });

    it('#isBiWeeklyCycleBelongToTheMonth with 26 as week and 12 as month should return true', () => {
        expect(service.isBiWeeklyCycleBelongToTheMonth(26, 12)).toBeTruthy();
    });

    it('#isBiWeeklyCycleBelongToTheMonth with 25 as week and 12 as month should return true', () => {
        expect(service.isBiWeeklyCycleBelongToTheMonth(25, 12)).toBeTruthy();
    });

    it('#isBiWeeklyCycleBelongToTheMonth with 24 as week and 12 as month should return true', () => {
        expect(service.isBiWeeklyCycleBelongToTheMonth(24, 12)).toBeTruthy();
    });

    /* ///////////////////////////////////// */
    /*               CONVERSION              */
    /* ///////////////////////////////////// */

    // BiWeeklyCycleConversion
    it('#getConstantSumWithBiWeeklyConversion with undefined input should return 0', () => {
        expect(service.getConstantSumWithBiWeeklyConversion(undefined)).toEqual(0);
    });

    it('#getConstantSumWithBiWeeklyConversion with empty array input should return 0', () => {
        expect(service.getConstantSumWithBiWeeklyConversion([])).toEqual(0);
    });

    it('#getConstantSumWithBiWeeklyConversion with constantStandarItemBIWEEKLY input should expect toatl of 301.5', () => {
        expect(service.getConstantSumWithBiWeeklyConversion(constantStandarItemBIWEEKLY)).toEqual(301.5);
    });

    it('#getConstantSumWithBiWeeklyConversion with constantStandarItemMONTHLY input should expect toatl of 300 * 12 / 26', () => {
        expect(service.getConstantSumWithBiWeeklyConversion(constantStandarItemMONTHLY)).toEqual(CalculateService.roundToCents(300 * 12 / 26));
    });

    it('#getConstantSumWithBiWeeklyConversion with constantStandarItemANNUALLY input should expect toatl of 300 / 26', () => {
        expect(service.getConstantSumWithBiWeeklyConversion(constantStandarItemANNUALLY)).toEqual(CalculateService.roundToCents(300 / 26));
    });

    it('#getConstantSumWithBiWeeklyConversion with constantStandarItemMixCycle input'
        + 'should expect toatl of 100.5 + (100.49 * 12 / 26) + (100.51 / 26)', () => {
        expect(service.getConstantSumWithBiWeeklyConversion(constantStandarItemMixCycle))
        .toEqual(CalculateService.roundToCents(100.5 + (100.49 * 12 / 26) + (100.51 / 26)));
    });

    it('#getConstantSumWithBiWeeklyConversion with constantStandarItemEmpty input should expect toatl of 0', () => {
        expect(service.getConstantSumWithBiWeeklyConversion(constantStandarItemEmpty))
        .toEqual(0);
    });

    // MonthlyConversion
    it('#getConstantSumWithMonthlyConversion with undefined input should return 0', () => {
        expect(service.getConstantSumWithMonthlyConversion(undefined)).toEqual(0);
    });

    it('#getConstantSumWithMonthlyConversion with empty array input should return 0', () => {
        expect(service.getConstantSumWithMonthlyConversion([])).toEqual(0);
    });

    it('#getConstantSumWithMonthlyConversion with constantStandarItemMONTHLY input should expect toatl of 300', () => {
        expect(service.getConstantSumWithMonthlyConversion(constantStandarItemMONTHLY)).toEqual(300);
    });

    it('#getConstantSumWithMonthlyConversion with constantStandarItemBIWEEKLY input should expect toatl of 301.5 * 26 / 12', () => {
        expect(service.getConstantSumWithMonthlyConversion(constantStandarItemBIWEEKLY)).toEqual(CalculateService.roundToCents(301.5 * 26 / 12));
    });

    it('#getConstantSumWithMonthlyConversion with constantStandarItemANNUALLY input should expect toatl of 300 / 12', () => {
        expect(service.getConstantSumWithMonthlyConversion(constantStandarItemANNUALLY)).toEqual(300 / 12);
    });

    it('#getConstantSumWithMonthlyConversion with constantStandarItemMixCycle input'
        + 'should expect toatl of 100.49 + (100.5 * 26 / 12) + (100.51 / 12)', () => {
        expect(service.getConstantSumWithMonthlyConversion(constantStandarItemMixCycle))
        .toEqual(CalculateService.roundToCents(100.49 + (100.5 * 26 / 12) + (100.51 / 12)));
    });

    it('#getConstantSumWithMonthlyConversion with constantStandarItemEmpty input should expect toatl of 0', () => {
        expect(service.getConstantSumWithMonthlyConversion(constantStandarItemEmpty))
        .toEqual(0);
    });

    // AnnuallyConversion
    it('#getConstantSumWithAnnuallyConversion with undefined input should return 0', () => {
        expect(service.getConstantSumWithAnnuallyConversion(undefined)).toEqual(0);
    });

    it('#getConstantSumWithAnnuallyConversion with empty array input should return 0', () => {
        expect(service.getConstantSumWithAnnuallyConversion([])).toEqual(0);
    });

    it('#getConstantSumWithAnnuallyConversion with constantStandarItemANNUALLY input should expect toatl of 300', () => {
        expect(service.getConstantSumWithAnnuallyConversion(constantStandarItemANNUALLY)).toEqual(300);
    });

    it('#getConstantSumWithAnnuallyConversion with constantStandarItemBIWEEKLY input should expect toatl of 301.5 * 26', () => {
        expect(service.getConstantSumWithAnnuallyConversion(constantStandarItemBIWEEKLY)).toEqual(CalculateService.roundToCents(301.5 * 26));
    });

    it('#getConstantSumWithAnnuallyConversion with constantStandarItemMONTHLY input should expect toatl of 300 * 12', () => {
        expect(service.getConstantSumWithAnnuallyConversion(constantStandarItemMONTHLY)).toEqual(CalculateService.roundToCents(300 * 12));
    });

    it('#getConstantSumWithAnnuallyConversion with constantStandarItemMixCycle input should expect toatl of (100.49 * 12) + 100.51 + (100.5 * 26)', () => {
        expect(service.getConstantSumWithAnnuallyConversion(constantStandarItemMixCycle)).toEqual(CalculateService.roundToCents((100.49 * 12) + 100.51 + (100.5 * 26)));
    });

    it('#getConstantSumWithAnnuallyConversion with constantStandarItemMixCycle input should expect toatl of 0', () => {
        expect(service.getConstantSumWithAnnuallyConversion(constantStandarItemEmpty)).toEqual(CalculateService.roundToCents(0));
    });

    /* ///////////////////////////////////// */
    /*          PERIODIC CONVERSION          */
    /* ///////////////////////////////////// */

    it('#getPeriodicSumWithMonthlyConverstion with undefined items and monthOfYear greater than 0 input should return 0', () => {
        expect(service.getPeriodicSumWithMonthlyConverstion(undefined, 1)).toEqual(0);
    });

    it('#getPeriodicSumWithMonthlyConverstion with empty array input and monthOfYear greater than 0 should return 0', () => {
        expect(service.getPeriodicSumWithMonthlyConverstion([], 1)).toEqual(0);
    });

    it('#getPeriodicSumWithMonthlyConverstion with periodicalVariable and monthOfYear as 2 should return -100', () => {
        expect(service.getPeriodicSumWithMonthlyConverstion(periodicalVarible, 2)).toEqual(-100);
    });

    it('#getPeriodicSumWithMonthlyConverstion with periodicalVariable and monthOfYear as 8 should return -100', () => {
        expect(service.getPeriodicSumWithMonthlyConverstion(periodicalVarible, 8)).toEqual(100);
    });

    it('#getPeriodicSumWithAnnuallyConverstion with undefined items input should return 0', () => {
        expect(service.getPeriodicSumWithAnnuallyConverstion(undefined)).toEqual(0);
    });

    it('#getPeriodicSumWithAnnuallyConverstion with empty array input should return 0', () => {
        expect(service.getPeriodicSumWithAnnuallyConverstion([])).toEqual(0);
    });

    it('#getPeriodicSumWithAnnuallyConverstion with periodicalVariable input should return -100', () => {
        expect(service.getPeriodicSumWithAnnuallyConverstion(periodicalVarible)).toEqual(-100);
    });

    /* ///////////////////////////////////// */
    /*         PROJECTION WITH CYCLE         */
    /* ///////////////////////////////////// */

    // Mothly Porjection
    it('#getMonthlyProjection with 0 numberOfMonth input should return empty array', () => {
        expect(service.getMonthlyProjection(0, 1, 0, fullInput)).toEqual([]);
    });

    it('#getMonthlyProjection with empty object input should return empty array', () => {
        expect(service.getMonthlyProjection(0, 1, 4, {})).toEqual([]);
    });

    it('#getMonthlyProjection with fullInput should equal to fullOutput', () => {
        expect(service.getMonthlyProjection(0, 1, 4, fullInput)).toEqual(fullOutput);
    });

    it('#getMonthlyProjection with noConstantIncomeInput should equal to noConstantIncomeOutput', () => {
        expect(service.getMonthlyProjection(0, 1, 4, noConstantIncomeInput)).toEqual(noConstantIncomeOutput);
    });

    it('#getMonthlyProjection with noConstantExpenseInput should equal to noConstantExpenseOutput', () => {
        expect(service.getMonthlyProjection(0, 1, 4, noConstantExpenseInput)).toEqual(noConstantExpenseOutput);
    });

    it('#getMonthlyProjection with noPeriodicInput should equal to noPeriodicOutput', () => {
        expect(service.getMonthlyProjection(0, 1, 4, noPeriodicInput)).toEqual(noPeriodicOutput);
    });

    // Annually Projection
    it('#getAnnuallyProjection with empty object input should return empty array', () => {
        expect(service.getAnnuallyProjection(0, 5, {})).toEqual([]);
    });

    it('#getAnnuallyProjection with 0 numberOfYears input should return empty array', () => {
        expect(service.getAnnuallyProjection(0, 0, {})).toEqual([]);
    });

    it('#getAnnuallyProjection with fullAnnalInput and numberOfYears of 4 input should return fullAnnalOutput', () => {
        expect(service.getAnnuallyProjection(0, 4, fullAnnalInput)).toEqual(fullAnnalOutput);
    });

    it('#getAnnuallyProjection with fullAnnalNoPeriodicInput and numberOfYears of 4 input should return fullAnnalNoPeriodicOutput', () => {
        expect(service.getAnnuallyProjection(0, 4, fullAnnalNoPeriodicInput)).toEqual(fullAnnalNoPeriodicOutput);
    });

    it('#getAnnuallyProjection with fullAnnalNoConstantIncomeInput and numberOfYears of 4 input should return fullAnnalNoConstantIncomeOutput', () => {
        expect(service.getAnnuallyProjection(0, 4, fullAnnalNoConstantIncomeInput)).toEqual(fullAnnalNoConstantIncomeOutput);
    });

    it('#getAnnuallyProjection with fullAnnalNoConstantExpenseInput and numberOfYears of 4 input should return fullAnnalNoConstantExpenseOutput', () => {
        expect(service.getAnnuallyProjection(0, 4, fullAnnalNoConstantExpenseInput)).toEqual(fullAnnalNoConstantExpenseOutput);
    });

    // BiWeekly Projection

    it('#getBiWeeklyProjection with empty object input should return empty array', () => {
        expect(service.getBiWeeklyProjection(0, 1, 26, {})).toEqual([]);
    });

    it('#getBiWeeklyProjection with 0 numberOfWeeks input should return empty array', () => {
        expect(service.getBiWeeklyProjection(0, 1, 0, {})).toEqual([]);
    });

    it('#getBiWeeklyProjection with fullBiWeekNoPeriodicInput and numberOfWeeks of 4 input should return fullBiWeekNoPeriodicOutput', () => {
        expect(service.getBiWeeklyProjection(0, 1, 4, fullBiWeekNoPeriodicInput)).toEqual(fullBiWeekNoPeriodicOutput);
    });

    it('#getBiWeeklyProjection with fullBiWeekNoPeriodicInput2 and numberOfWeeks of 4 input should return fullBiWeekNoPeriodicOutput', () => {
        expect(service.getBiWeeklyProjection(0, 1, 4, fullBiWeekNoPeriodicInput2)).toEqual(fullBiWeekNoPeriodicOutput);
    });

    it('#getBiWeeklyProjection with biWeeklyNoConstantInput and numberOfWeeks of 9  and biWeeklyNoConstantInput input should return biWeeklyNoConstantOutput', () => {
        expect(service.getBiWeeklyProjection(0, 1, 9, biWeeklyNoConstantInput)).toEqual(biWeeklyNoConstantOutput);
    });

    it('#getBiWeeklyProjection with fullBiWeeklyPeriodicMonth6and12Input and numberOfWeeks of 26 input should return fullBiWeeklyPeriodicMonth6and12InputOutput', () => {
        expect(service.getBiWeeklyProjection(0, 1, 26, biWeeklyPeriodicMonth6and12Input)).toEqual(biWeeklyPeriodicMonth6and12InputOutput);
    });
    


    /* ///////////////////////////////////// */
    /*       PROJECTION WITH INACTIVE        */
    /* ///////////////////////////////////// */

    // Full Porjection With Inactive
  it('#getMonthlyProjection with fullInputWithInactive should equal to fullOutputWithInactive', () => {
    expect(service.getMonthlyProjection(0, 1, 4, fullInputWithInactive)).toEqual(fullOutputWithInactive);
  });

});
