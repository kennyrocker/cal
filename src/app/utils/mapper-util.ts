import { Constant } from '../constants/constant';
import { StanderItemCycleShortForm } from '../constants/enums/cal-cycle';
import { StandarItem } from '../constants/interfaces/standar-item';
import { PeriodicItem } from 'src/app/constants/interfaces/periodic-item';

export class MapperUtil {

    public static EnumMapToArray(data: any): any[] {
        return Object.keys(data)
        .filter(n => !isNaN(Number(n)))
        .map(
            item => ( {key: MapperUtil.formateKeyString(data[item]) , value: item} )
        );
    }

    public static FormatAffectiveMonth(months: number[]): string {
        let nm = '';
        months.forEach((element, index) => {
            nm += (index === 0 ? '' : ', ') + element.toString();
        });
        return nm;
    }

    private static formateKeyString(description: string): string {
        return description.replace(/_/g, ' ');
    }

    public static generateRandomId() {
        return Math.floor(Math.random() * Math.floor(Constant.MAX_ID_DIGIT));
    }

    public static generateProjectionId(userId: string): string {
        const t = new Date().getTime().toString();
        return userId + 'pq' + t;
    }

    private static mapToStanderItemCycle(str: string): number {
      switch (str) {
        case 'a' :
          return StanderItemCycleShortForm.a;
        case 'b' :
          return StanderItemCycleShortForm.b;
        case 'm' :
          return StanderItemCycleShortForm.m;
        default :
          return StanderItemCycleShortForm.m;  // default is monthly
      }
    }

    public static mapStanderItem(str: string): StandarItem {
      if (!str) {
        return null;
      }
      const digitRegex = /\d|\./g;
      const amountStartIndex = str.search(digitRegex);
      const amountEndIndex = str.length - 1;
      const name = str.substring(0, amountStartIndex);
      const amount = str.substring(amountStartIndex, amountEndIndex);
      const cycle = MapperUtil.mapToStanderItemCycle(
        str.substring(amountEndIndex, str.length));
      return {
        id: MapperUtil.generateRandomId(),
        name: name,
        amount: Number(amount),
        cycle: Number(cycle),
        active: true
      };
    }

    public static mapPeriodicItem(str: string): PeriodicItem {
      if (!str) {
        return null;
      }
      const digitRegex = /\d|\.|-/g;
      const atRegex = /@/g;
      const firstDigitIndex = str.search(digitRegex);
      const atIndex = str.search(atRegex);
      const name = str.substring(0, firstDigitIndex);
      const amount = Number(str.substring(firstDigitIndex, atIndex));
      const months = str.substring(atIndex + 1, str.length);
      const monthsArr = months.split(',');
      const cycle = months.length === 1 ? 1 : 12; // TODO:: might want to use Enum from input
      const affectiveMonth = [];
      monthsArr.map(x => {
        affectiveMonth.push(Number(x));
      });
      return {
        id: MapperUtil.generateRandomId(),
        name: name,
        amount: Number(amount),
        cycle: Number(cycle),
        affectiveMonth: MapperUtil.uniqueSingleKeyArry(affectiveMonth),
        active: true
      };
    }

    public static mergeRemoveDuplicateByKey(a1: any[], a2: any[], key: string): any[] {
      const output = [];
      const base = a1.concat(a2);
      if (a1.length === 0) {
        return a2;
      }
      if (a2.length === 0) {
        return a1;
      }
      if (!key) {
        return base;
      }
      const keys = [];
      const reference = {};
      base.map((i) => {
        keys.push(i[key]);
      });
      keys.map((b, i) => {
        reference[b] = reference[b] || output.push(base[i]);
      });
      return output;
    }

    public static uniqueSingleKeyArry(arr: any[]): any[] {
      const reference = {};
      const output = [];
      arr.map((b) => { reference[b] = reference[b] || output.push(b) });
      return output;
    }

}
