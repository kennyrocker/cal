export class MapperUtil {

    public static EnumMapToArray(data: any): any[] {
        return Object.keys(data)
        .filter(n => !isNaN(Number(n)))
        .map(
            item => ( {key: data[item], value: item} )
        );
    }

    public static FormatAffectiveMonth(months: number[]): string {
        let nm = '';
        months.forEach((element, index) => {
            nm += (index === 0 ? '' : ', ') + element.toString();
        });
        return nm;
    }
}
