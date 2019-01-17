import { Injectable } from '@angular/core';
import { CalData } from '../../constants/interfaces/cal-data';
import { StandarItem } from 'src/app/constants/interfaces/standar-item';
import { CalCycle } from 'src/app/constants/enums/cal-cycle';

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


    // converters
    protected getStaticTotalOfBiWeeklyCycleConversion(items: StandarItem[]): number {
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
      return total;
    }

  }








    // Money View
// This app display cycle of money balance base on variables of income and expense


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
