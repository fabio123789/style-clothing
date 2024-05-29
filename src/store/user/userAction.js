import { createAction } from "../../utils/reducer/reducer";
import { userActionType } from "./userTypes";

export const setCurrentUser = (user) => {
  return createAction({ type: userActionType.setCurrentUser, payload: user });
};
