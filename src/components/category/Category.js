import { useNavigate } from "react-router-dom";
import "./Category.scss";
import ProductCard from "../productCard/ProductCard";
import {
  CategoriesContainer,
  CategoryPreviewContainer,
  CategoryPreviewGrid,
  CategoryTitle,
} from "./CtegoryStyled";

const Category = ({ categoryItem = {} }) => {
  const { imageUrl, title } = categoryItem;
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/shop/" + title)}
      className="category-directory-container"
    >
      <div
        className="category-background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="category-body-container">
        <h2>{title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export const Categories = ({ categoriesArray = [] }) => {
  return (
    <CategoriesContainer>
      {categoriesArray.map((category) => {
        return <Category categoryItem={category} key={category.id} />;
      })}
    </CategoriesContainer>
  );
};

export const CategoryPreview = ({ title, products }) => {
  return (
    <CategoryPreviewContainer>
      <h2>
        <CategoryTitle to={title}>{title.toUpperCase()}</CategoryTitle>
      </h2>
      <CategoryPreviewGrid>
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryPreviewGrid>
    </CategoryPreviewContainer>
  );
};

export default Category;
