import { CalSnapShot } from './cal-snap-shot';
import { CalData } from './cal-data';
import { UserState } from './user';
import { UiState } from './ui';

export interface Entities {
  user: UserState;
  ui: UiState;
  snapshot: CalSnapShot[];
  collection: CalData[];
}
