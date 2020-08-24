
export class Constant {
  public static CHECKBOX_DEBOUNCE_TIME = 200;
  public static QUICK_INPUT_DEBOUNCE_TIME = 2500;
  public static MAX_ID_DIGIT = 1000000000;
  public static DISPLAY_CHART_SCHEME_SINGLE = {
    domain: ['#1F2041', '#4B3F72', '#FFC857', '#119DA4', '#19647E']
  };
  public static DISPLAY_CHART_SCHEME_MULTI = {
    domain: ['#31393C',  '#33A1FD', '#FBB13C', '#8A817C', '#2176FF']
  };

  // tslint:disable-next-line:max-line-length
  public static EMAIL_PATTERN = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$';

  public static USER_ID_COOKIE = 'uid';
  public static USER_EMAIL_COOKIE = 'email';
  public static USER_NAME_COOKIE = 'name';
  public static USER_ACCESS_TOKEN_COOKIE = 'uat';
  public static COOKIE_EXPIRE_DAY = 1; // is now 1 day, make sure this is the same as the server session time
  public static NEW_ROUTE_NAME = 'new';
  public static NEW_PROJECTION_ID = 'new_id';
  public static SAMPLE_PROJECTION_ID = 'sample_id';
  public static COPY_SUFFIX = '_COPY';
  public static COPY_ID = 'copy_id';
}
