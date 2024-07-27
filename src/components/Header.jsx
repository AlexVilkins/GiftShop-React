import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../App";

import basketImg from "../assets/busket.svg";
import favoriteImg from "../assets/card/heart.png";
import logo from "../assets/logo.png";
import filter from "../assets/filter.png";
import setup from "../assets/setup.svg";
import orders from "../assets/orders.png";

function Header({
  onClickBasket,
  onClickFavorite,
  onClickOrders,
  filterVal,
  onChangeFilter,
}) {
  const { basketPrice } = React.useContext(AppContext);

  return (
    <div className="header">
      <Link to="/">
        <div className="header__logo">
          <img className="header__logo-img" src={logo} alt="logo" />
        </div>
      </Link>
      <div className="filter">
        <img className="filter__img" src={filter} alt="filter" />
        <input
          className="filter__input"
          type="text"
          placeholder="Поиск товара"
          value={filterVal}
          onChange={onChangeFilter}
        />
      </div>
      <div className="panel">
        <div className="panel__favorite" onClick={onClickFavorite}>
          <img src={favoriteImg} alt="favorite"></img>
        </div>
        <div className="panel__basket" onClick={onClickBasket}>
          <img src={basketImg} alt="busket"></img>
          <div>{basketPrice() > 0 ? basketPrice() : 0} руб.</div>
        </div>
        <div className="panel__orders" onClick={onClickOrders}>
          <img src={orders} alt="orders" />
        </div>
        <div className="panel__setup">
          <Link to="/login">
            <img src={setup} alt="setup"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
