import styles from "./ProductsCard.module.scss";
import ContentLoader from "react-content-loader";
import React, { useState } from "react";

import { AppContext } from "../../App";

function ProdCard({ obj, onPlus, onFavorite, isLoading }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { isItemAdded, isFavoriteAdded } = React.useContext(AppContext);

  const favoriteOnClick = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  };

  const addOnClick = () => {
    onPlus(obj);
  };

  return (
    <>
      {isLoading ? (
        <ContentLoader
          speed={2}
          width={240}
          height={300}
          viewBox="0 0 290 430"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="30" y="0" rx="10" ry="10" width="180" height="160" />
          <rect x="15" y="210" rx="5" ry="5" width="210" height="20" />
          <rect x="15" y="240" rx="5" ry="5" width="150" height="20" />
          <rect x="150" y="290" rx="5" ry="5" width="25" height="25" />
          <rect x="190" y="290" rx="5" ry="5" width="25" height="25" />
          <rect x="15" y="280" rx="10" ry="10" width="100" height="40" />
        </ContentLoader>
      ) : (
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
                    isFavoriteAdded(obj.id)
                      ? "/prodCard/addHeart.png"
                      : "/prodCard/heart.png"
                  }
                  alt="favorite"
                />
              </button>
              <button onClick={addOnClick}>
                <img
                  className={styles.add}
                  src={
                    isItemAdded(obj.id)
                      ? "/prodCard/addedAdd.png"
                      : "/prodCard/add.png"
                  }
                  alt="add"
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ProdCard;
