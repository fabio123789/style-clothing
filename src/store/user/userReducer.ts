import { UnknownAction } from 'redux'
import { UserData } from '../../utils/firebase/Firebase'
import { emailSignInStart, emailSignUpStart, googleSignInStart, sigInFailure, sigInSuccess, signOutFailed, signOutStart, signOutSuccess, signUpFailure } from './userAction'

export type UserState = {
  readonly currentUser: UserData | null,
  readonly loading: boolean
  readonly error: Error | null
}

const initialState: UserState = {
  currentUser: null,
  loading: false,
  error: null
}

export const userReducer = (state = initialState, action = {} as UnknownAction): UserState => {
  if (signOutStart.match(action) || emailSignInStart.match(action) || emailSignUpStart.match(action) || googleSignInStart.match(action)) {
    return { ...state, loading: true }
  }
  if (sigInFailure.match(action) || signOutFailed.match(action) || signUpFailure.match(action)) {
    return { ...state, error: action.payload, loading: false }
  }
  if (sigInSuccess.match(action)) {
    return {
      ...state,
      currentUser: action.payload,
      loading: false
    }
  }
  if (signOutSuccess.match(action)) {
    return { ...state, currentUser: null, loading: false }

  }
  return state
}
