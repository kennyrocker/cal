// TODO:: config this from environment file
const host = 'http://localhost:6080';

export const apiUrls = {
  USER_REGISTER : `${host}/user`,
  USER_LOGIN : `${host}/user/login`,
  GET_TEMPLATE_SAMPLE : (lang: string) => `${host}/template/sample/${lang}`,
  GET_SNAP_SHOT : (userId: string) => `${host}/snap-shot/${userId}`,
  GET_PROJECTION : (projectionId: string) => `${host}/projection/${projectionId}`,
  GET_PROJECTION_BATCH : `${host}/get-projection-batch`,
  POST_PROJECTION : `${host}/projection`,
  UPDATE_PROJECTION : (projectionId: string) => `${host}/projection/${projectionId}`,
  DELETE_PROJECTION : (projectionId: string) => `${host}/projection/${projectionId}`
};
