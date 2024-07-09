import { UnknownAction } from 'redux';
import { fetchCategoriesFailure, fetchCategoriesStart, fetchCategoriesSuccess } from './categoryAction.ts'
import { Category } from './categoryTypes.ts'

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean
  readonly error: Error | null
}

export const categoriesInitialState: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (state = categoriesInitialState, action = {} as UnknownAction): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true }
  }
  if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false }
  }
  if (fetchCategoriesFailure.match(action)) {
    return { ...state, error: action.payload, isLoading: false }
  }

  return state
}
