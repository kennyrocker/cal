import { createSelector } from '@ngrx/store';

export const getUser = createSelector(
   (state: any) => state.calData.user,
  (user) => user
);

export const isSampleLoaded = createSelector(
  (state: any) => state.calData.ui.sampleLoaded,
  (loaded) => loaded
);

export const isSnapShotsLoaded = createSelector(
    (state: any) => state.calData.ui.snapshotLoaded,
    (loaded) => loaded
);

export const getAllSnapShots = createSelector(
    (state: any) => state.calData.snapshot,
    (snapshots) => snapshots
);

export const getCollections = createSelector(
    (state: any) => state.calData.collection,
    (collections) => collections
);

export const getProjectionById = createSelector(
    getCollections,
    (collections, props) => collections.find((i) => i.id === props.id)
);

export const isProjectionExistedFromCollection = createSelector(
    getCollections,
    (collections, props) => {
        return collections.find((i) => i.id === props.id) ? true : false;
    }
);

// Compare module selector
export const isProjectionsExistedFromCollection = createSelector(
    getCollections,
    (collections, props) => {
        const map = props.ids;
        for (const obj in props.ids) {
            if (collections.find(i => i.id === obj)) {
                delete map[obj];
            }
        }
        return map;
    }
);

export const getProjectionsByIds = createSelector(
    getCollections,
    (collections, props) => {
        return collections.filter(o => props.ids[o.id] !== undefined);
    }
);

// UI selector
export const getAuthModalState = createSelector(
    (state: any) => state.calData.ui.authModalOpen,
  (authModalOpen) => authModalOpen
);

export const getSnapshotSelected = createSelector(
    (state: any) => state.calData.ui.snapshotSelected,
    (snapshotSelected) => snapshotSelected
);

export const getUILock = createSelector(
    (state: any) => state.calData.ui.lock,
    (lock) => lock
);

export const getUIdragItem = createSelector(
    (state: any) => state.calData.ui.dragItem,
    (dragItem) => dragItem
);
