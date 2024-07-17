import CategoriesCard from "../components/CategoriesCard";
import ProductsCard from "../components/ProductsCard";

import { AppContext } from "../App";
import React from "react";

function Home({
  category,
  filterVal,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const { products } = React.useContext(AppContext);

  return (
    <>
      <div className="categories">
        <div className="title">Категории</div>
        <div className="categories__items">
          {category.map((item) => (
            <CategoriesCard key={item.id} img={item.img} text={item.text} />
          ))}
        </div>
      </div>
      <div className="products">
        <div className="title">
          {filterVal ? `Поиск по запросу: ${filterVal}` : "Все товары"}
        </div>
        <div className="products__items">
          {isLoading
            ? [...Array(8)].map((obj, index) => (
                <ProductsCard obj={obj} key={index} isLoading={isLoading} />
              ))
            : products
                .filter((obj) =>
                  obj.text
                    .toLocaleLowerCase()
                    .includes(filterVal.toLocaleLowerCase())
                )
                .map((obj, index) => (
                  <ProductsCard
                    obj={obj}
                    key={index}
                    isLoading={isLoading}
                    onFavorite={(obj) => onAddToFavorite(obj)}
                    onPlus={(obj) => onAddToCart(obj)}
                  />
                ))}
        </div>
      </div>
    </>
  );
}

export default Home;
