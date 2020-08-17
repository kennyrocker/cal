import { Lock } from './lock';

export interface UiState {
  snapshotLoaded: boolean;
  snapshotSelected: string[];
  lock: Lock;
  dragItem: any;
  authModalOpen: boolean;
}
