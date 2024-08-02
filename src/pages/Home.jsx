import { Card, Categories } from "../components";

import { setAddProducts } from "../redux/actions/products";
import { featchItems } from "../api";

import React from "react";
import { useDispatch, useSelector } from "react-redux";

const Home = React.memo(function Home({
  category,
  filterVal,
  onAddToFavorite,
  onAddToCart,
  isLoading,
}) {
  const dispatch = useDispatch();
  const products = useSelector(({ products }) => products.items);
  console.log("products", products);
  React.useEffect(() => {
    const featchData = async () => {
      dispatch(setAddProducts(await featchItems()));
    };

    featchData();
  }, []);

  return (
    <>
      <div className="categories">
        <div className="title">Категории</div>
        <div className="categories__items">
          {category.map((item, index) => (
            <Categories key={index} img={item.img} text={item.text} />
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
                <Card obj={obj} key={index} isLoading={isLoading} />
              ))
            : products
                .filter((obj) =>
                  obj.text
                    .toLocaleLowerCase()
                    .includes(filterVal.toLocaleLowerCase())
                )
                .map((obj, index) => (
                  <Card
                    {...obj}
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
});

export default Home;
