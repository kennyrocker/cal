import { Snapshot } from './snapshot';
import { CalData } from './cal-data';
import { Lock } from './lock';

export interface Entites {
  ui: {
    snapshotLoaded: boolean;
    snapshotSelected: string[];
    lock: Lock;
  };
  snapshot: Snapshot[];
  collection: CalData[];
}
