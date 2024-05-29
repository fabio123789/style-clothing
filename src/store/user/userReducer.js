import { userActionType } from "./userTypes";

const initialState = {
  currentUser: null,
};

export const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case userActionType.setCurrentUser:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      return state;
  }
};
