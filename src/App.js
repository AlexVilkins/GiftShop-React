import Basket from "./components/Basket";
import Favorite from "./components/Favorite";
import Order from "./components/Order";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Test from "./pages/Test";

import React, { useEffect } from "react";
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
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [orderTotal, setOrderTotal] = React.useState([]);
  const [orderNumber, setOrderNumber] = React.useState(1);
  const [filterVal, setFilterVal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [push, setPush] = React.useState(false);

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

  const onAddToCart = async (obj) => {
    try {
      const findItem = addedItems.find(
        (item) => Number(item.parentId) === Number(obj.parentId)
      );

      if (
        addedItems.some(
          (item) => Number(item.parentId) === Number(obj.parentId)
        )
      ) {
        setAddedItems(
          addedItems.filter(
            (item) => Number(item.parentId) !== Number(obj.parentId)
          )
        );
        await axios.delete(
          `https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket/${findItem.id}`
        );
      } else {
        setAddedItems([...addedItems, obj]);
        const { data } = await axios.post(
          "https://66910f4126c2a69f6e8e426e.mockapi.io/test/basket",
          obj
        );

        setAddedItems((prev) =>
          prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          })
        );
      }
    } catch (error) {
      alert("Произошла ошибка при запросе данных", error);
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
    return addedItems.some((obj) => Number(obj.parentId) === Number(id));
  };

  const isFavoriteAdded = (id) => {
    return favoriteItems.some((obj) => Number(obj.id) === Number(id));
  };

  const basketPrice = () => {
    return addedItems.reduce((sum, obj) => {
      return obj.newPrice + sum;
    }, 0);
  };

  const pushOrderTotal = (item) => {
    setOrderNumber(orderNumber + 1);
    setOrderTotal([...orderTotal, { ...item, orderNumber: orderNumber }]);
    setAddedItems([]);
    setPush(true);
  };

  useEffect(() => {}, [orderTotal]);

  return (
    <AppContext.Provider
      value={{
        products,
        favoriteItems,
        orderTotal,
        push,
        basketPrice,
        isItemAdded,
        isFavoriteAdded,
        pushOrderTotal,
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

        <Order orderOpen={orderOpen} onClickClose={() => setOrderOpen(false)} />

        <div className="wrapper">
          <Header
            onChangeFilter={onChangeFilter}
            onClickBasket={() => setBasketOpen(true)}
            onClickFavorite={() => setFavoriteOpen(true)}
            onClickOrders={() => setOrderOpen(true)}
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
