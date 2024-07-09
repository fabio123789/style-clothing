import { RootState } from "../Store.ts";
import { UserState } from "./userReducer.ts";
import { createSelector } from 'reselect';

export const selectUserReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(selectUserReducer, (user) => user.currentUser)
