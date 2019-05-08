import { Constant } from '../constants/constant';

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

}
