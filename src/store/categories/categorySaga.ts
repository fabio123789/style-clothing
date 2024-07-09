import { takeLatest, all, call, put } from 'typed-redux-saga/macro'
import { getCategoriesAndDocuments } from '../../utils/firebase/Firebase.ts'
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} from './categoryAction.ts'
import { categoriesActionType } from './categoryTypes.ts'

export function * fetchCategoriesAsync () {
  try {
    const categoriesArray = yield* call(getCategoriesAndDocuments, 'categories')
    yield* put(fetchCategoriesSuccess(categoriesArray))
  } catch (error) {
    yield* put(fetchCategoriesFailure(error as Error))
  }
}

export function * onFetchCategories () {
  yield* takeLatest(
    categoriesActionType.fetchCategoriesStart,
    fetchCategoriesAsync
  )
}

export function * categoriesSaga () {
  yield* all([call(onFetchCategories)])
}
