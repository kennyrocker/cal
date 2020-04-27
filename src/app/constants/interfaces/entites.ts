import { Snapshot } from './snapshot';
import { CalData } from './cal-data';

export interface Entites {
  ui: {
    snapshotLoaded: boolean;
    snapshotSelected: string[];
  };
  snapshot: Snapshot[];
  collection: CalData[];
}
