import React from "react";

import { AppContext } from "../../App";

import styles from "./Favorite.module.scss";

function Favorite({ favoritOpen, onClickClose, onRemoveItem }) {
  const { favoriteItems } = React.useContext(AppContext);
  console.log("favoriteItems", favoriteItems);

  return (
    <div
      className={`${styles.favorite} ${
        favoritOpen ? styles.favoriteVisible : ""
      }`}
    >
      <div className={styles.container}>
        <div className="title">Избранное</div>
        <button className={styles.closeFavorite} onClick={onClickClose}>
          <img
            className={styles.closeFavorite_img}
            src="/close.png"
            alt="delete"
          />
        </button>
        {favoriteItems.length ? (
          <div>
            {favoriteItems.map((item, index) => (
              <div className={styles.card} key={index}>
                <img className={styles.img} src={item.img} alt="logo" />
                <div className={styles.description}>
                  {item.text}
                  <div className={styles.text}></div>
                  <div className={styles.price}>
                    <div className={styles.newPrice}>{item.newPrice}</div>
                    <div className={styles.oldPrice}>{item.oldPrice}</div>
                    <div className={styles.rating}>{item.rating}</div>
                  </div>
                </div>
                <button
                  className={styles.delete}
                  onClick={() => onRemoveItem(item)}
                >
                  <img
                    className={styles.detele_img}
                    src="/close.png"
                    alt="delete"
                  />
                </button>
              </div>
            ))}
            <button onClick={onClickClose} className={styles.push}>
              <img src="/arrow.png" alt="arrow" />
              Назад
            </button>
          </div>
        ) : (
          <div className={styles.empty}>Избранное пусто</div>
        )}
      </div>
    </div>
  );
}

export default Favorite;
