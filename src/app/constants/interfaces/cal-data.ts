import { StandarItem } from '../interfaces/standar-item';
import { PeriodicItem } from '../interfaces/periodic-item';
import { FixItem } from '../interfaces/fix-item';

export interface CalData {
    constantIncome?: StandarItem[];
    constantExpense?: StandarItem[];
    periodicalVariable?: PeriodicItem[];
    staticVariable?: FixItem[];
}
