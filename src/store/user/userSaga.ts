import { takeLatest, put, all, call } from 'typed-redux-saga/macro'
import { userActionType } from './userTypes'
import {
  sigInSuccess,
  sigInFailure,
  signUpFailure,
  signOutFailed,
  signOutSuccess,
  EmailSignInStart,
  EmailSignUpStart
} from './userAction'
import {
  AdditionalInformation,
  createAuthUserEmailAndPassword,
  createUserDocFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signinAuthUserEmailAndPassword,
  signoutUser
} from '../../utils/firebase/Firebase'
import { User } from 'firebase/auth'

export function* getSnapshotFromUserAuth(userAuth: User, additionalDetails?: AdditionalInformation) {
  try {
    const userSnapshot = yield* call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails
    )
    if (userSnapshot)
      yield* put(sigInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }))
  } catch (error) {
    yield* put(sigInFailure(error as Error))
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield* call(getCurrentUser)
    if (!userAuth) return
    yield* call(getSnapshotFromUserAuth, userAuth)
  } catch (error) {
    yield* put(sigInFailure(error as Error))
  }
}

export function* signInEmail({ payload: { email, password } }: EmailSignInStart) {
  try {
    const userCredential = yield* call(signinAuthUserEmailAndPassword, email, password)
    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapshotFromUserAuth, user)
    }
  } catch (error) {
    yield* put(sigInFailure(error as Error))
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield* call(signInWithGooglePopup)
    yield* call(getSnapshotFromUserAuth, user)
  } catch (error) {
    yield* put(sigInFailure(error as Error))
  }
}

export function* signUpEmail({ payload: { email, password, displayName } }: EmailSignUpStart) {
  try {
    const userCredential = yield* call(
      createAuthUserEmailAndPassword,
      email,
      password
    )
    if (userCredential) {
      const { user } = userCredential
      yield* call(getSnapshotFromUserAuth, user, { displayName })

    }
  } catch (error) {
    yield* put(signUpFailure(error as Error))
  }
}

export function* signOut() {
  try {
    yield* call(signoutUser)
    yield* put(signOutSuccess())
  } catch (error) {
    yield* put(signOutFailed(error as Error))
  }
}

export function* onSignUpStart() {
  yield* takeLatest(userActionType.signUpStart, signUpEmail)
}

export function* onEmailSignInStart() {
  yield* takeLatest(userActionType.emailSignInStart, signInEmail)
}

export function* onGoogleSignInStart() {
  yield* takeLatest(userActionType.googleSignInStart, signinWithGoogle)
}

export function* onCheckUserSession() {
  yield* takeLatest(userActionType.checkUserSession, isUserAuthenticated)
}

export function* onsignOutStart() {
  yield* takeLatest(userActionType.signOutStart, signOut)
}

export function* userSagas() {
  yield* all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onsignOutStart)
  ])
}
