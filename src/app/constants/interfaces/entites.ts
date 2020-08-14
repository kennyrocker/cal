import { Snapshot } from './snapshot';
import { CalData } from './cal-data';
import { Lock } from './lock';
import { UserState } from './user';

export interface Entites {
  user: UserState;
  ui: {
    snapshotLoaded: boolean;
    snapshotSelected: string[];
    lock: Lock;
    dragItem: any;
  };
  snapshot: Snapshot[];
  collection: CalData[];
}
