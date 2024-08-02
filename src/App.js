import Home from "./pages/Home";
import Login from "./pages/Login";
import { Header, Basket, Favorite, Order, Footer } from "./components";
import { featchBasket, deleteBasketItem, addBasketItem } from "./api";

import phone from "./assets/products/phone.png";
import clean from "./assets/products/clean.png";
import home from "./assets/products/home.png";
import pen from "./assets/products/pen.png";
import pot from "./assets/products/pot.png";
import toy from "./assets/products/toy.png";

import { setAddBasket } from "./redux/actions/basket";

import { Routes, Route } from "react-router-dom";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const AppContext = React.createContext();

function App() {
  const category = [
    {
      img: phone,
      text: "Смартфоны",
    },
    {
      img: clean,
      text: "Бытовая техника",
    },
    {
      img: home,
      text: "Товары для дома",
    },
    {
      img: pen,
      text: "Канцелярия",
    },
    {
      img: pot,
      text: "Посуда",
    },
    {
      img: toy,
      text: "Игрушки",
    },
  ];
  const [basketOpen, setBasketOpen] = React.useState(false);
  const [favoriteOpen, setFavoriteOpen] = React.useState(false);
  const [orderOpen, setOrderOpen] = React.useState(false);
  const [addedItems, setAddedItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [orderTotal, setOrderTotal] = React.useState([]);
  const [filterVal, setFilterVal] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);

  const dispatch = useDispatch();

  React.useEffect(() => {
    const featchaData = async () => {
      dispatch(setAddBasket(featchBasket()));

      const dataBasket = await featchBasket();

      setIsLoading(false);
      setAddedItems(dataBasket);
    };

    featchaData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = addedItems.find(
      (item) => Number(item.parentId) === Number(obj.parentId)
    );

    if (
      addedItems.some((item) => Number(item.parentId) === Number(obj.parentId))
    ) {
      setAddedItems(
        addedItems.filter(
          (item) => Number(item.parentId) !== Number(obj.parentId)
        )
      );
      await deleteBasketItem(findItem.id);
    } else {
      setAddedItems([...addedItems, obj]);
      const { data } = await addBasketItem(obj);

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

  const pushOrderTotal = () => {
    setAddedItems([]);
  };

  useEffect(() => {}, [orderTotal]);

  return (
    <AppContext.Provider
      value={{
        favoriteItems,
        orderTotal,
        basketPrice,
        isItemAdded,
        isFavoriteAdded,
        pushOrderTotal,
      }}
    >
      <Basket
        basketOpen={basketOpen}
        onClickClose={() => setBasketOpen(false)}
        addedItems={addedItems}
        onRemoveItem={(obj) => onAddToCart(obj)}
      />

      <Favorite
        favoritOpen={favoriteOpen}
        onClickClose={() => setFavoriteOpen(false)}
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
    </AppContext.Provider>
  );
}

export default App;
