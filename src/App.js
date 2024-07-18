import Basket from "./components/Basket";
import Favorite from "./components/Favorite";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";

import React from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";

export const AppContext = React.createContext();

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
  const [favoriteOpen, setFavoriteOpen] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [filterVal, setFilterVal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get("https://66910f4126c2a69f6e8e426e.mockapi.io/test/products")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        alert("Произошла ошибка при запросе данных");
      });
    axios
      .get("https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket")
      .then((response) => {
        setAddedItems(response.data);
      })
      .catch((error) => {
        alert("Произошла ошибка при запросе данных");
      });
  }, []);

  const onAddToCart = (obj) => {
    if (addedItems.some((item) => item.id === obj.id)) {
      setAddedItems(addedItems.filter((item) => item.id !== obj.id));
      axios
        .delete(
          `https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket/${obj.id}`
        )
        .catch((error) => {
          alert("Произошла ошибка при запросе данных");
        });
    } else {
      setAddedItems([...addedItems, obj]);
      axios
        .post("https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket", obj)
        .catch((error) => {
          alert("Произошла ошибка при запросе данных");
        });
    }
  };

  const onAddToFavorite = (obj) => {
    if (favoriteItems.some((item) => item.id === obj.id)) {
      setFavoriteItems(favoriteItems.filter((item) => item.id !== obj.id));
    } else {
      setFavoriteItems([...favoriteItems, obj]);
    }
  };

  const onChangeFilter = (event) => {
    setFilterVal(event.target.value);
  };

  const isItemAdded = (id) => {
    return addedItems.some((obj) => Number(obj.id) === Number(id));
  };

  const isFavoriteAdded = (id) => {
    return favoriteItems.some((obj) => Number(obj.id) === Number(id));
  };

  const basketPrice = () => {
    return addedItems.reduce((sum, obj) => {
      return obj.newPrice + sum;
    }, 0);
  };

  return (
    <AppContext.Provider
      value={{
        products,
        favoriteItems,
        basketPrice,
        isItemAdded,
        isFavoriteAdded,
      }}
    >
      <div>
        <Basket
          basketOpen={basketOpen}
          onClickClose={() => setBasketOpen(false)}
          addedItems={addedItems}
          onRemoveItem={(obj) => onAddToCart(obj)}
        />

        <Favorite
          favoritOpen={favoriteOpen}
          onClickClose={() => setFavoriteOpen(false)}
          // favoriteItems={favoriteItems}
          onRemoveItem={(obj) => onAddToFavorite(obj)}
        />

        <div className="wrapper">
          <Header
            onChangeFilter={onChangeFilter}
            onClickBasket={() => setBasketOpen(true)}
            onClickFavorite={() => setFavoriteOpen(true)}
            filterVal={filterVal}
          />
          <Routes>
            <Route
              path="/"
              exact
              element={
                <Home
                  isLoading={isLoading}
                  category={category}
                  filterVal={filterVal}
                  onAddToCart={onAddToCart}
                  onAddToFavorite={onAddToFavorite}
                />
              }
            />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </AppContext.Provider>
  );
}

export default App;
