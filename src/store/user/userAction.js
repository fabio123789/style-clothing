import { createAction } from "../../utils/reducer/reducer";
import { userActionType } from "./userTypes";

export const setCurrentUser = (user) => {
  return createAction({ type: userActionType.setCurrentUser, payload: user });
};

export const checkUserSession = () =>
  createAction(userActionType.checkUserSession);

export const googleSignInStart = () =>
  createAction(userActionType.googleSignInStart);

export const emailSignInStart = (email, password) =>
  createAction(userActionType.emailSignInStart, { email, password });

export const sigInSuccess = (user) =>
  createAction(userActionType.sigInSuccess, user);

export const sigInFailure = (error) =>
  createAction(userActionType.sigInFailure, error);

export const emailSignUpStart = (email, password, displayName) =>
  createAction(userActionType.signUpStart, { email, password, displayName });

export const signUpSuccess = (user) =>
  createAction(userActionType.signUpSuccess, user);

export const signUpFailure = (error) =>
  createAction(userActionType.signUpFailed, error);

export const signOutStart = () => createAction(userActionType.signOutStart);

export const signOutSuccess = () => createAction(userActionType.signOutSuccess);

export const signOutFailed = (error) =>
  createAction(userActionType.signOutFailed, error);
