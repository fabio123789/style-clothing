import { all, call } from "redux-saga/effects";
import { categoriesSaga } from "./categories/categorySaga.ts";
import { userSagas } from "./user/userSaga.ts";

export function* rootSaga() {
  yield all([call(categoriesSaga), call(userSagas)]);
}
