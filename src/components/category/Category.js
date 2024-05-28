import { useNavigate } from "react-router-dom";
import ProductCard from "../productCard/ProductCard";
import {
  CategoriesContainer,
  CategoryBackgroundImage,
  CategoryBodyContainer,
  CategoryDirectoryContainer,
  CategoryPreviewContainer,
  CategoryPreviewGrid,
  CategoryTitle,
} from "./CategoryStyled";

const Category = ({ categoryItem = {} }) => {
  const { imageUrl, title } = categoryItem;
  const navigate = useNavigate();
  return (
    <CategoryDirectoryContainer onClick={() => navigate("/shop/" + title)}>
      <CategoryBackgroundImage imageUrl={imageUrl} />
      <CategoryBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </CategoryBodyContainer>
    </CategoryDirectoryContainer>
  );
};

const categories = [
  {
    id: 1,
    title: "hats",
    imageUrl: "https://i.ibb.co/cvpntL1/hats.png",
  },
  {
    id: 2,
    title: "jackets",
    imageUrl: "https://i.ibb.co/px2tCc3/jackets.png",
  },
  {
    id: 3,
    title: "sneakers",
    imageUrl: "https://i.ibb.co/0jqHpnp/sneakers.png",
  },
  {
    id: 4,
    title: "womens",
    imageUrl: "https://i.ibb.co/GCCdy8t/womens.png",
  },
  {
    id: 5,
    title: "mens",
    imageUrl: "https://i.ibb.co/R70vBrQ/men.png",
  },
];

export const Categories = () => {
  return (
    <CategoriesContainer>
      {categories.map((category) => {
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
