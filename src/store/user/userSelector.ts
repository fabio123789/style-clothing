import { RootState } from "../Store";
import { UserState } from "./userReducer";
import { createSelector } from 'reselect';

export const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser)
