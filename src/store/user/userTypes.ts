export enum userActionType {
  checkUserSession = 'user/checkUserSession',
  googleSignInStart = 'user/googleSignInStart',
  emailSignInStart = 'user/emailSignInStart',
  sigInSuccess = 'user/sigInSuccess',
  sigInFailure = 'user/sigInFailure',
  signUpStart = 'user/signUpStart',
  signUpSuccess = 'user/signUpSuccess',
  signUpFailed = 'user/signUpFailed',
  signOutStart = 'user/signOutStart',
  signOutSuccess = 'user/signOutSuccess',
  signOutFailed = 'user/signOutFailed'
}
