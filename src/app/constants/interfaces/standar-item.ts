import { CalCycle } from '../enums/cal-cycle';

export interface StandarItem {
    id: number;
    name: string;
    amount: number;
    cycle: CalCycle;
    active: boolean;
}
