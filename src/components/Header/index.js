import styles from "./Header.module.scss";
import React from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../App";

function Header({ onClickBasket, onClickFavorite, filterVal, onChangeFilter }) {
  const { basketPrice } = React.useContext(AppContext);

  return (
    <div className={styles.header}>
      <Link to="/">
        <div className={styles.logo}>
          <img src="/img.png" alt="logo" />
        </div>
      </Link>
      <div className={styles.filter}>
        <img src="/filter.png" alt="filter" />
        <input
          type="text"
          placeholder="Поиск товара"
          value={filterVal}
          onChange={onChangeFilter}
        />
      </div>
      <div className={styles.panel}>
        <div className={styles.favorite} onClick={onClickFavorite}>
          <img src="/prodCard/heart.png" alt="favorite"></img>
        </div>
        <div className={styles.basket} onClick={onClickBasket}>
          <img src="/busket.svg" alt="busket"></img>
          <div className={styles.pice}>
            {basketPrice() > 0 ? basketPrice() : 0} руб.
          </div>
        </div>
        <div className={styles.setup}>
          <Link to="/login">
            <img src="/setup.svg" alt="setup"></img>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Header;
