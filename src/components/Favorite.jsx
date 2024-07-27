import React from "react";

import { AppContext } from "../App";
import close from "../assets/close.png";
import arrow from "../assets/arrow.png";
import empty_box from "../assets/empty_box.png";
import phone from "../assets/products/phone.png";

function Favorite({ favoritOpen, onClickClose, onRemoveItem }) {
  const { favoriteItems } = React.useContext(AppContext);

  return (
    <div className={`${"favorite"} ${favoritOpen ? "favoriteVisible" : ""}`}>
      <div className="favorite__container">
        <div className="title">Избранное</div>
        <button className="favorite__close" onClick={onClickClose}>
          <img className="favorite__close-img" src={close} alt="delete" />
        </button>
        {favoriteItems.length ? (
          <div>
            {favoriteItems.map((item, index) => (
              <div className="favorite-card" key={index}>
                <img className="favorite-card__img" src={phone} alt="logo" />
                <div className="favorite-card__description">
                  {item.text}
                  <div className="favorite-card__text"></div>
                  <div className="favorite-card__price">
                    <div className="favorite-card__newPrice">
                      {item.newPrice}
                    </div>
                    <div className="favorite-card__oldPrice">
                      {item.oldPrice}
                    </div>
                    <div className="favorite-card__rating">{item.rating}</div>
                  </div>
                </div>
                <button
                  className="favorite-card__delete"
                  onClick={() => onRemoveItem(item)}
                >
                  <img
                    className="favorite-card__delete-img"
                    src={close}
                    alt="delete"
                  />
                </button>
              </div>
            ))}
            <button onClick={onClickClose} className="push">
              <img src={arrow} alt="arrow" />
              Назад
            </button>
          </div>
        ) : (
          <>
            <div className="favorite-card__text">
              <img src={empty_box} alt="empty" />
              Избранное пусто
            </div>
            <button onClick={onClickClose} className="empty">
              <img src={arrow} alt="arrow" />
              Назад
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Favorite;
