import { Lock } from './lock';

export interface UiState {
  sampleLoaded: boolean;
  snapshotLoaded: boolean;
  snapshotSelected: string[];
  lock: Lock;
  dragItem: any;
  authModalOpen: boolean;
}
