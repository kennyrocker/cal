export class MapperUtil {
    public static EnumMapToArray(data: any): any[] {
        return Object.keys(data)
        .filter(n => !isNaN(Number(n)))
        .map(
            item => ( {key: data[item], value: item} )
        );
    }
}
