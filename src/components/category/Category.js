import { Link, useNavigate } from "react-router-dom";
import "./Category.scss";
import ProductCard from "../productCard/ProductCard";

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
    <div className="categories-container">
      {categoriesArray.map((category) => {
        return <Category categoryItem={category} key={category.id} />;
      })}
    </div>
  );
};

export const CategoryPreview = ({ title, products }) => {
  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">{title.toUpperCase()}</Link>
      </h2>
      <div className="preview">
        {products
          .filter((_, index) => index < 4)
          .map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Category;
