export enum categoriesActionType {
  fetchCategoriesStart = 'category/fetchCategoriesStart',
  fetchCategoriesSuccess = 'category/fetchCategoriesSuccess',
  fetchCategoriesFailed = 'category/fetchCategoriesFailed'
}

export type CategoryItem = {
  id: number
  imageUrl: string
  name: string
  price: number
}

export type Category = {
  title: string
  imageUrl: string
  items: CategoryItem[]
}

export type CategoryMap = {
  [key: string]: CategoryItem[]
}