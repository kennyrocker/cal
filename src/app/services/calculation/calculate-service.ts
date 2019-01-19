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
    
    /* floor to cent, since there no currency for 1/10 of cent */
    public roundToCents(input: number): number {
      return Math.floor(input * 100) / 100;
    }

    private isProjectionUnhandle(calData: CalData): boolean {
      return !calData.constantIncome && !calData.constantExpense && !calData.periodicalVarible;
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
      if (!items || items.length === 0) return 0;
      let total = 0;
      for (let i = 0;  i < items.length; i++) {
        if (items[i].cycle === CalCycle.BIWEEKLY) {
          total += (items[i].amount * CalCycle.BIWEEKLY / CalCycle.MONTHLY );
        }
        if (items[i].cycle === CalCycle.MONTHLY) {
          total += items[i].amount;
        }
        if (items[i].cycle === CalCycle.ANNALLY) {
          total += (items[i].amount / CalCycle.MONTHLY);
        }
      }
      return this.roundToCents(total);
    };

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

    /* ///////////////////////////////////// */
    /*         PROJECTION WITH CYCLE         */
    /* ///////////////////////////////////// */
    
    public getMonthlyProjection(initBalance: number, startingMonthOfYear: number,
                                numberOfMonths: number, calData: CalData): DisplayItem[] {
        
        if (this.isProjectionUnhandle(calData)) return [];
        if (numberOfMonths < 1) return [];                        

        let output: DisplayItem[] = [];
        let balance = initBalance ? initBalance : 0;

        let monthlyIncomeBalance = this.getConstantSumWithMonthlyConversion(calData.constantIncome);
        let monthlyExpenseBalance = this.getConstantSumWithMonthlyConversion(calData.constantExpense);
        let monthlyConstantBalance = monthlyIncomeBalance - monthlyExpenseBalance;
        
        for (let i = startingMonthOfYear; i < (startingMonthOfYear + numberOfMonths); i++) {
            let month = i;
            if (i > CalCycle.MONTHLY) {
                month = i % CalCycle.MONTHLY;
            }
            if (month == CalCycle.MONTHLY) {
                month = CalCycle.MONTHLY;
            }
            let cyclePeriodicBalance = this.getPeriodicSumWithMonthlyConverstion(calData.periodicalVarible, month);
            balance +=  this.roundToCents(monthlyConstantBalance + cyclePeriodicBalance);
            let displayItem = {
                name: month.toString(),
                value: balance
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

        console.log(output);

        return output;
    }

  }







// cycle constant from annal prepective
// var ANNALLY = 1;
// var MONTHLY = 12;
// var BIWEEKLY = 26;




// // get cycle by input
// function cycle(it){
  
  // this.getBiWeekly = function(){
  //    var b = 0;
  //    for(var i=0;  i<it.length; i++){
  //      if(it[i].cycle === BIWEEKLY){
  //        b += it[i].amount;
  //      }
       
  //      if(it[i].cycle === MONTHLY){
  //        b += (it[i].amount * MONTHLY / BIWEEKLY);
  //      }
       
  //      if(it[i].cycle === ANNALLY){
  //        b += (it[i].amount / BIWEEKLY);
  //      }
       
  //    }
  //    return b;
  //  };
   
//    this.getMonthly = function(){
//      var b = 0;
//      for(var i=0;  i<it.length; i++){
       
//        if(it[i].cycle === BIWEEKLY){
//          b += (it[i].amount * BIWEEKLY / MONTHLY );
//        }
       
//        if(it[i].cycle === MONTHLY){
//          b += it[i].amount;
//        }
       
//        if(it[i].cycle === ANNALLY){
//          b += (it[i].amount / MONTHLY);
//        }
       
//      }
//      return b;
//    };
   
//    this.getAnnal = function(){
//      var b = 0;
//      for(var i=0;  i<it.length; i++){
       
//        if(it[i].cycle === BIWEEKLY){
//          b += (it[i].amount * BIWEEKLY );
//        }
       
//        if(it[i].cycle === MONTHLY){
//          b += (it[i].amount * MONTHLY);
//        }
       
//        if(it[i].cycle === ANNALLY){
//          b += it[i].amount;
//        }
//      }
//      return b;
//    };
// }







// // data constructor
// var ic = new income();
// var incomeItems = new cycle(ic);
// var ex = new expense();
// var expenseItems = new cycle(ex);
// var pv = new periodic();


// // varian calculation
// var sumBy = function(cycle){
//   var b = 0;
  
//   if(cycle === MONTHLY){
//      var income1 = incomeItems.getMonthly();
//      var expense1 = expenseItems.getMonthly();
//      b = income1 - expense1;
//   }else if (cycle === BIWEEKLY){
//      var income2 = incomeItems.getBiWeekly();
//      var expense2 = expenseItems.getBiWeekly();
//      b = income2 - expense2;
//   }else { // ANNALLY
//      var income3 = incomeItems.getAnnal();
//      var expense3 = expenseItems.getAnnal();
//      b = income3 - expense3;
//   }
    
//   return b;
// };


//console.log("BIWEEKLY SUM => " + sumBy(BIWEEKLY));
//console.log("MONTHLY SUM => " + sumBy(MONTHLY));
//console.log("ANNALLY SUM => " + sumBy(ANNALLY));




// //  biweekly projection 
// var bwProjection = function(base, start ,n){

//   var b = base;
//   var growth = sumBy(BIWEEKLY);
  
//   for (var i = start; i< (start+n); i++){
//     // month
//     var m = i;
//     if(i > BIWEEKLY){
//       m = i % BIWEEKLY ;
//     }
//     if(m === 0){
//       m = BIWEEKLY;
//     }
    
//     var pg = getDurationBalanceBiWeekly(BIWEEKLY, m, pv);
    
//     // balance
//     b += growth;

//     console.log( " BIWEEKLY :: " + m + " || BLANCE :: $" + b);
//   }
  
// };



// //  monthly projection 
// var mProjection = function(base, start ,n){

//   var b = base;
//   // static growth
//   var growth = sumBy(MONTHLY);
  
//   for (var i = start; i< (start+n); i++){
//     // month
//     var m = i;
//     if(i > MONTHLY){
//       m = i % MONTHLY ;
//     }
//     if(m === 0){
//       m = MONTHLY;
//     }
    
//     // periodic growth by month
//     var pg = getDurationBalanceMonthly(MONTHLY, m, pv);
   
//     // balance
//     b += (growth + pg);

//     console.log( " MOTNH :: " + m + " || BLANCE :: $" + b);
//   }
  
// };

// // annal projection
// var yProjection = function(base ,start ,n){

//   var b = base;
//   var growth = sumBy(ANNALLY);
  
//   for (var i = start; i< (start+n); i++){
    
//     // periodic growth by month
//     var pg = getDurationBalanceYearly(pv);
//     // balance
//     b += (growth + pg);
    

//     console.log( " YEAR :: " + i + " || BLANCE :: $" + b);
//   }
  
// };




// // TODO :: ADD periodic into caculation
// // get biweekly duration balance base on cycle and point
// var getDurationBalanceBiWeekly = function(cycle, pointX, data){
//   console.log("CYCLE : "+cycle);
//   console.log("POINT : "+pointX);
//   //console.log("DATA",data);
  
  
  
//   var point = Math.floor(pointX * 12 / 26); // this is a decemal, need to round it to int with accuracy
//   console.log("NEW POINT : FLOOR "+point);
  
//   var b = 0;
  
//   for(var i=0; i< data.length; i++){
//     var am = data[i].amount;
//     if(data[i].cycle === MONTHLY){
//       var pArr = data[i].affectiveMonth;
//       for(var j=0; j<pArr.length; j++){
//         if(pArr[j] === point){
//           b += am;
//         }
//       }
//     }
//     if(data[i].cycle === ANNALLY){
//       if(data[i].affectiveMonth[0] === point){
//         b += am;
//       }
//     }
//   }
  
//   return b;
  
// };



// // get monthly duration balance base on cycle and point
// var getDurationBalanceMonthly = function(cycle, point, data){
//   var b = 0;
//   for(var i=0; i< data.length; i++){
//     var am = data[i].amount;
//     if(data[i].cycle === MONTHLY){
//       var pArr = data[i].affectiveMonth;
//       for(var j=0; j<pArr.length; j++){
//         if(pArr[j] === point){
//           b += am;
//         }
//       }
//     }
//     if(data[i].cycle === ANNALLY){
//       if(data[i].affectiveMonth[0] === point){
//         b += am;
//       }
//     }
//   }
//   return b;
// };


// // get yearly duration blance base on cycle and month
// var getDurationBalanceYearly = function(data){
//   var b = 0;
//   for(var m = 1; m<= 12; m++){
//       for(var i=0; i< data.length; i++){
//           var am = data[i].amount;
//           if(data[i].cycle === MONTHLY){
//               var pArr = data[i].affectiveMonth;
//               for(var j=0; j<pArr.length; j++){
//                   if(pArr[j] === m){
//                       b += am;
//                   }
//               }
//           }
//           if(data[i].cycle === ANNALLY){
//             if(data[i].affectiveMonth[0] === m){
//               b += am;
//             }
//           }
//       }
//   }
//   return b;
// };





//}
