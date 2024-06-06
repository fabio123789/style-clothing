import { userActionType } from "./userTypes";

const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActionType.signUpStart:
    case userActionType.emailSignInStart:
    case userActionType.googleSignInStart:
    case userActionType.signOutStart:
      return { ...state, loading: true };
    case userActionType.sigInSuccess:
    case userActionType.signUpSuccess:
      return {
        ...state,
        currentUser: payload,
        loading: false,
      };
    case userActionType.sigInFailure:
    case userActionType.signUpFailed:
    case userActionType.signOutFailed:
      return { ...state, error: payload, loading: false };
    case userActionType.signOutSuccess:
      return { ...state, currentUser: null, loading: false };
    default:
      return state;
  }
};
