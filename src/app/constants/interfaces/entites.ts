import { Snapshot } from './snapshot';
import { CalData } from './cal-data';

export interface Entites {
  ui: {
    snapshotLoaded: boolean;
  };
  snapshot: Snapshot[];
  collection: CalData[];
}
