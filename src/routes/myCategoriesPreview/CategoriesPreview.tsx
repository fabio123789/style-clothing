import React from 'react'
import { CategoryPreview } from '../../components/category/Category.tsx'
import { selectCategoriesMap } from '../../store/categories/categorySelector.ts'
import { useSelector } from 'react-redux'

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCategoriesMap)
  return (
    <>
      {Object.keys(categoriesMap).map((title, key) => {
        const products = categoriesMap[title]
        return <CategoryPreview key={key} title={title} products={products} />
      })}
    </>
  )
}

export default CategoriesPreview
