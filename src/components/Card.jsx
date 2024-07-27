import ContentLoader from "react-content-loader";
import React, { useState } from "react";

import { AppContext } from "../App";
import addHeart from "../assets/card/addHeart.png";
import heart from "../assets/card/heart.png";
import star from "../assets/card/star.svg";
import added from "../assets/card/addedAdd.png";
import add from "../assets/card/add.png";
import phone from "../assets/products/phone.png";

function ProdCard({
  id,
  img,
  text,
  oldPrice,
  newPrice,
  rating,
  onPlus,
  onFavorite,
  isLoading,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const { isItemAdded, isFavoriteAdded } = React.useContext(AppContext);

  const obj = { id, parentId: id, img, text, oldPrice, newPrice, rating };

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
        <div className="card">
          <div className="card__discount">
            <div className="card__stock">-39%</div>
            <div className="card__stock">Успей купить</div>
          </div>
          <img className="card__img" src={phone} alt="phone" />
          <div className="card__rating">
            <img className="card__rating-img" src={star} alt="star" />
            <div className="card__rating-text">{obj.rating}</div>
          </div>
          <div className="card__description">{obj.text}</div>
          <div className="card__price">
            <div>
              <div className="card__price-new">{obj.newPrice} Р</div>
              <div className="card__price-old">{obj.oldPrice}</div>
            </div>
            <button className="card__button" onClick={favoriteOnClick}>
              <img
                className="card__button-img"
                src={isFavoriteAdded(obj.id) ? addHeart : heart}
                alt="favorite"
              />
            </button>
            <button className="card__button" onClick={addOnClick}>
              <img
                className="card__button-img"
                src={isItemAdded(obj.id) ? added : add}
                alt="add"
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default ProdCard;
