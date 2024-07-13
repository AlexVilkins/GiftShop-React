import Basket from "./components/Basket";
import Header from "./components/Header";
import CategoriesCard from "./components/CategoriesCard";
import ProductsCard from "./components/ProductsCard";
import Footer from "./components/Footer";
import React from "react";
import axios from "axios";

function App() {
  const [category, setCategory] = React.useState([
    {
      img: "/products/phone.png",
      text: "Смартфоны",
    },
    {
      img: "/products/clean.png",
      text: "Бытовая техника",
    },
    {
      img: "/products/home.png",
      text: "Товары для дома",
    },
    {
      img: "/products/pen.png",
      text: "Канцелярия",
    },
    {
      img: "/products/pot.png",
      text: "Посуда",
    },
    {
      img: "/products/toy.png",
      text: "Игрушки",
    },
  ]);
  const [products, setProducts] = React.useState([]);
  const [basketOpen, setBasketOpen] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [filterVal, setFilterVal] = React.useState("");

  React.useEffect(() => {
    axios
      .get("https://66910f4126c2a69f6e8e426e.mockapi.io/test/products")
      .then((response) => {
        setProducts(response.data);
      });
    axios
      .get("https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket")
      .then((response) => {
        setAddedItems(response.data);
      });
  }, []);

  const onAddToCart = (obj) => {
    console.log(addedItems);
    if (addedItems.some((item) => item.id === obj.id)) {
      setAddedItems(addedItems.filter((item) => item.id !== obj.id));
      axios.delete(
        `https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket/${obj.id}`
      );
    } else {
      setAddedItems([...addedItems, obj]);
      axios.post(
        "https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket",
        obj
      );
    }
  };

  const onChangeFilter = (event) => {
    setFilterVal(event.target.value);
  };

  return (
    <div>
      <Basket
        basketOpen={basketOpen}
        onClickClose={() => setBasketOpen(false)}
        addedItems={addedItems}
        onRemoveItem={(obj) => onAddToCart(obj)}
      />

      <div className="wrapper">
        <Header
          onChangeFilter={onChangeFilter}
          onClickBasket={() => setBasketOpen(true)}
          filterVal={filterVal}
        />
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
            {products
              .filter((obj) =>
                obj.text
                  .toLocaleLowerCase()
                  .includes(filterVal.toLocaleLowerCase())
              )
              .map((obj, index) => (
                <ProductsCard
                  obj={obj}
                  key={index}
                  //   img={obj.img}
                  //   text={obj.text}
                  //   oldPrice={obj.oldPrice}
                  //   newPrice={obj.newPrice}
                  //   rating={obj.rating}
                  onPlus={(obj) => onAddToCart(obj)}
                />
              ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
