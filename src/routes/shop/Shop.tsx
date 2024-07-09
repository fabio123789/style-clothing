import React, { useEffect } from 'react'
import './Shop.scss'
import { Route, Routes } from 'react-router-dom'
import CategoriesPreview from '../myCategoriesPreview/CategoriesPreview.tsx'
import Category from '../category/Category.tsx'
import { fetchCategoriesStart } from '../../store/categories/categoryAction.ts'
import { useDispatch } from 'react-redux'

const Shop = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategoriesStart())
  }, [dispatch])
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}

export default Shop
