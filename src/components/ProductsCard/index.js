import styles from "./ProductsCard.module.scss";
import React, { useState } from "react";

function ProdCard({ obj, onPlus, onFavorite }) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const favoriteOnClick = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  };

  const addOnClick = () => {
    setIsAdd(!isAdd);
    onPlus(obj);
  };

  return (
    <div className={styles.card}>
      <div className={styles.discount}>
        <div className={styles.stock}>-39%</div>
        <div className={styles.stock}>Успей купить</div>
      </div>
      <img className={styles.img} src={obj.img} alt="phone" />
      <div className={styles.rating}>
        <img src="/star.svg" alt="star" />
        <div className={styles.rating__text}>{obj.rating}</div>
      </div>
      <div className={styles.text}>{obj.text}</div>
      <div className={styles.panel}>
        <div className="">
          <div className={styles.price__new}>{obj.newPrice} Р</div>
          <div className={styles.price_old}>{obj.oldPrice}</div>
        </div>
        <div>
          <button onClick={favoriteOnClick}>
            <img
              className={styles.favorite}
              src={
                isFavorite ? "/prodCard/addHeart.png" : "/prodCard/heart.png"
              }
              alt="favorite"
            />
          </button>
          <button onClick={addOnClick}>
            <img
              className={styles.add}
              src={isAdd ? "/prodCard/addedAdd.png" : "/prodCard/add.png"}
              alt="add"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProdCard;
