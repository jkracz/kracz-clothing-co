import createAction from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => {
    // when you use the dispatch function, you just want to pass it the action obj
    // the actual reducer will maintain current state
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}

export const checkUserSession = () => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION);

export const googleSignInStart = () => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START);

export const emailSignInStart = (email, password) => createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password });

export const signInSuccess = (user) => createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user);

export const signInFailure = (error) => createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error);

export const signUpStart = (email, password, displayName) => createAction(USER_ACTION_TYPES.SIGN_UP_START, { email, password, displayName });

export const signUpSuccess = (user, additionalDetails) => createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails });

export const signUpFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_UP_FAILED, error);

export const signOutStart = () => createAction(USER_ACTION_TYPES.SIGN_OUT_START);

export const signOutFailed = (error) => createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error);

export const signOutSuccess = () => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS);