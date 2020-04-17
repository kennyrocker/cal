import {createSelector } from '@ngrx/store';


export const getAllSnapShots = createSelector(
    (state: any) => state.calData.snapshot,
    (snapshots) => snapshots
);


export const getSnapShotById = createSelector(
    getAllSnapShots,
    (snapshots, props) => snapshots.find((i) => i.id === props.id)
);

export const getSnapShotByIdisLoaded = createSelector(
    getSnapShotById,
    (snapshot, props) => {
      return snapshot ? snapshot.collectionLoaded : false;
    }
);

export const getCollections = createSelector(
    (state: any) => state.calData.collection,
    (collections) => collections
);

export const getProjectionById = createSelector(
    getCollections,
    (collections, props) => collections.find((i) => i.id === props.id)
);
