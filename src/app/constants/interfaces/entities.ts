import { CalSnapShot } from './cal-snap-shot';
import { CalData } from './cal-data';
import { Lock } from './lock';
import { UserState } from './user';

export interface Entities {
  user: UserState;
  ui: {
    snapshotLoaded: boolean;
    snapshotSelected: string[];
    lock: Lock;
    dragItem: any;
  };
  snapshot: CalSnapShot[];
  collection: CalData[];
}
