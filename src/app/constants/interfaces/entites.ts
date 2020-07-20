import { Snapshot } from './snapshot';
import { CalData } from './cal-data';
import { Lock } from './lock';

export interface Entites {
  ui: {
    snapshotLoaded: boolean;
    snapshotSelected: string[];
    lock: Lock;
    dragItem: any;
  };
  snapshot: Snapshot[];
  collection: CalData[];
}
