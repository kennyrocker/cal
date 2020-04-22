import {createSelector } from '@ngrx/store';

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
