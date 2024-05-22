import "./Category.scss";

const Category = ({ categoryItem = {} }) => {
  const { imageUrl, title } = categoryItem;
  return (
    <div className="category-container">
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


export const Categories = ({categoriesArray = []}) => {
  return (
    <div className="categories-container">
      {categoriesArray.map((category) => {
        return <Category categoryItem={category} key={category.id} />;
      })}
    </div>
  );
};

export default Category;
