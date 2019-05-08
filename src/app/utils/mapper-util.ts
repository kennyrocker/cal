import { Constant } from '../constants/constant';
import { StanderItemCycleShortForm } from '../constants/enums/cal-cycle';
import { StandarItem } from '../constants/interfaces/standar-item';

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
      cycle: Number(cycle)
    };
  }

}
