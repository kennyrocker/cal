// for npm run start
const host = 'http://localhost:6080';

export const USER_REGISTER_URL = `${host}/user`;
export const USER_LOGIN_URL = `${host}/user/login`;

export const GET_SNAP_SHOT_URL = (userId: string) => `${host}/snap-shot/${userId}`;
export const GET_PROJECTION_URL = (projectionId: string) => `${host}/projection/${projectionId}`;
export const GET_PROJECTION_BATCH = `${host}/get-projection-batch`;
export const PROJECTION_POST_URL = `${host}/projection`;
export const DELETE_PROJECTION_URL = (projectionId: string) => `${host}/projection/${projectionId}`;
export const UPDATE_PROJECTION_URL = (projectionId: string) => `${host}/projection/${projectionId}`;
