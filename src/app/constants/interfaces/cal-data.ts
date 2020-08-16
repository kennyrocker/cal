import { StandarItem } from '../interfaces/standar-item';
import { PeriodicItem } from '../interfaces/periodic-item';
import { FixItem } from '../interfaces/fix-item';
import { CalSnapShot } from './cal-snap-shot';

export interface CalData extends CalSnapShot {
    userId?: string;
    constantIncome?: StandarItem[];
    constantExpense?: StandarItem[];
    periodicalVariable?: PeriodicItem[];
    staticVariable?: FixItem[];
}
