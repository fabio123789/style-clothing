import { takeLatest, put, all, call } from "redux-saga/effects";
import { userActionType } from "./userTypes";
import {
  sigInSuccess,
  sigInFailure,
  signUpFailure,
  signOutFailed,
  signOutSuccess,
} from "./userAction";
import {
  createAuthUserEmailAndPassword,
  createUserDocFromAuth,
  getCurrentUser,
  signInWithGooglePopup,
  signinAuthUserEmailAndPassword,
  signoutUser,
} from "../../utils/firebase/Firebase";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    const userSnapshot = yield call(
      createUserDocFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(sigInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(sigInFailure(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(sigInFailure(error));
  }
}

export function* signInEmail({ payload: { email, password } }) {
  try {
    const user = yield call(signinAuthUserEmailAndPassword, email, password);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(sigInFailure(error));
  }
}

export function* signinWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(sigInFailure(error));
  }
}

export function* signUpEmail({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield call(
      createAuthUserEmailAndPassword,
      email,
      password
    );
    yield call(getSnapshotFromUserAuth, user, { displayName });
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signOut() {
  try {
    yield call(signoutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error));
  }
}

export function* onSignUpStart() {
  yield takeLatest(userActionType.signUpStart, signUpEmail);
}

export function* onEmailSignInStart() {
  yield takeLatest(userActionType.emailSignInStart, signInEmail);
}

export function* onGoogleSignInStart() {
  yield takeLatest(userActionType.googleSignInStart, signinWithGoogle);
}

export function* onCheckUserSession() {
  yield takeLatest(userActionType.checkUserSession, isUserAuthenticated);
}

export function* onsignOutStart() {
  yield takeLatest(userActionType.signOutStart, signOut);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onSignUpStart),
    call(onsignOutStart),
  ]);
}
