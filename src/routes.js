/**
 * All available routes for the app
 */

export const HOME = '/';
export const SIGN_UP = '/sign-up';
export const SIGN_UP_EMAIL_CONFIRMATION = '/sign-up-email-confirmation/:token';
export const FORGOT_PASSWORD = '/forgot-password';
export const FORGOT_PASSWORD_RESET = '/forgot-password-reset/:token';
export const FOLLOWERS = '/followers/:username'
export const EDIT_PROFILE = '/edit-profile';


export const AUTH_INFO = '/auth-info';
export const RESET_PASSWORD = '/reset-password';
export const USER_PROFILE = '/:username';
export const EXPLORE = '/explore';
export const PEOPLE = '/people';
export const NOTIFICATIONS = '/notifications';
export const MESSAGES = '/messages/:userId';
export const POST = '/post/:id';


/**
 * Value that's used in place of id when creating something new.
 */
export const NEW_ID_VALUE = 'new';
