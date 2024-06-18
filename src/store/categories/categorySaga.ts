import { takeLatest, all, call, put } from 'typed-redux-saga/macro'
import { getCategoriesAndDocuments } from '../../utils/firebase/Firebase'
import {
  fetchCategoriesSuccess,
  fetchCategoriesFailure
} from './categoryAction'
import { categoriesActionType } from './categoryTypes'

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
