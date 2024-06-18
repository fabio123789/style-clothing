import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer'
import { userActionType } from './userTypes'
import { UserData } from '../../utils/firebase/Firebase';
import { User } from 'firebase/auth';

export type CheckUserSession = Action<userActionType.checkUserSession>
export type GoogleSignInStart = Action<userActionType.googleSignInStart>
export type EmailSignInStart = ActionWithPayload<userActionType.emailSignInStart, { email: string, password: string }>
export type SigInSuccess = ActionWithPayload<userActionType.sigInSuccess, UserData>
export type SigInFailure = ActionWithPayload<userActionType.sigInFailure, Error>
export type EmailSignUpStart = ActionWithPayload<userActionType.signUpStart, { email: string, password: string, displayName: string }>
export type SignUpSuccess = ActionWithPayload<userActionType.signUpSuccess, User>
export type SignUpFailed = ActionWithPayload<userActionType.signUpFailed, Error>
export type SignOutStart = Action<userActionType.signOutStart>
export type SignOutSuccess = Action<userActionType.signOutSuccess>
export type SignOutFailed = ActionWithPayload<userActionType.signOutFailed, Error>

export const checkUserSession = withMatcher((): CheckUserSession =>
  createAction(userActionType.checkUserSession))

export const googleSignInStart = withMatcher((): GoogleSignInStart =>
  createAction(userActionType.googleSignInStart))

export const emailSignInStart = withMatcher((email: string, password: string): EmailSignInStart =>
  createAction(userActionType.emailSignInStart, { email, password }))

export const sigInSuccess = withMatcher((user: UserData & { id: string }): SigInSuccess =>
  createAction(userActionType.sigInSuccess, user))

export const sigInFailure = withMatcher((error: Error): SigInFailure =>
  createAction(userActionType.sigInFailure, error))

export const emailSignUpStart = withMatcher((email: string, password: string, displayName: string): EmailSignUpStart =>
  createAction(userActionType.signUpStart, { email, password, displayName }))

export const signUpSuccess = withMatcher((user: User): SignUpSuccess =>
  createAction(userActionType.signUpSuccess, user))

export const signUpFailure = withMatcher((error: Error): SignUpFailed =>
  createAction(userActionType.signUpFailed, error))

export const signOutStart = withMatcher((): SignOutStart => createAction(userActionType.signOutStart))

export const signOutSuccess = withMatcher((): SignOutSuccess => createAction(userActionType.signOutSuccess))

export const signOutFailed = withMatcher((error: Error): SignOutFailed =>
  createAction(userActionType.signOutFailed, error))
