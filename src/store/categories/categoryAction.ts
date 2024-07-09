import { Action, ActionWithPayload, createAction, withMatcher } from '../../utils/reducer/reducer.ts'
import { Category, categoriesActionType } from './categoryTypes.ts'

export type FetchCategoriesStart = Action<categoriesActionType.fetchCategoriesStart>

export type FetchCategoriesSuccess = ActionWithPayload<categoriesActionType.fetchCategoriesSuccess, Category[]>

export type FetchCategoriesFailure = ActionWithPayload<categoriesActionType.fetchCategoriesFailed, Error>

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
  createAction(categoriesActionType.fetchCategoriesStart))

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
  createAction(categoriesActionType.fetchCategoriesSuccess, categoriesArray))

export const fetchCategoriesFailure = withMatcher((error: Error): FetchCategoriesFailure =>
  createAction(categoriesActionType.fetchCategoriesFailed, error)
)