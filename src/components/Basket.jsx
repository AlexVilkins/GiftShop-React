import React from "react";

import { AppContext } from "../App";
import close from "../assets/close.png";
import arrow from "../assets/arrow.png";
import add_box from "../assets/add_box.png";
import empty_box from "../assets/empty_box.png";
import phone from "../assets/products/phone.png";

import { useDispatch, useSelector } from "react-redux";
import { setAddOrder } from "../redux/actions/order";

function Basket({ basketOpen, onClickClose, addedItems = [], onRemoveItem }) {
  const { basketPrice, pushOrderTotal } = React.useContext(AppContext);
  const [orderNumber, setOrderNumber] = React.useState(1);
  const dispatch = useDispatch();

  const onOrderProduct = () => {
    setOrderNumber(orderNumber + 1);
    dispatch(setAddOrder(orderNumber, addedItems));
    pushOrderTotal();
  };

  const orderCount = useSelector(({ order }) => order);

  return (
    <div className={`${"basket"} ${basketOpen ? "basketVisible" : ""}`}>
      <div className="basket__container">
        <div className="title">Корзина</div>
        <button className="basket__close" onClick={onClickClose}>
          <img className="basket__close-img" src={close} alt="delete" />
        </button>
        {addedItems.length ? (
          <div>
            {addedItems.map((item, index) => (
              <div className="basket-card" key={index}>
                <img className="basket-card__img" src={phone} alt="logo" />
                <div className="basket-card__description">
                  {item.text}
                  <div className="basket-card__price">
                    <div className="basket-card__newPrice">{item.newPrice}</div>
                    <div className="basket-card__oldPrice">{item.oldPrice}</div>
                    <div className="basket-card__rating">{item.rating}</div>
                  </div>
                </div>
                <button
                  className="basket-card__delete"
                  onClick={() => onRemoveItem(item)}
                >
                  <img
                    className="basket-card__delete-img"
                    src={close}
                    alt="delete"
                  />
                </button>
              </div>
            ))}
            <div className="basket-footer">
              <div className="basket-footer__total">
                <div>Итого:</div>

                <div>{basketPrice() ? basketPrice() : 0} P</div>
              </div>
              <button
                className="basket-footer__push"
                onClick={() => onOrderProduct()}
              >
                Заказать
                <img
                  className="basket-footer__push-img"
                  src={arrow}
                  alt="arrow"
                />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="basket-empty">
              <img src={orderCount.length ? add_box : empty_box} alt="empty" />
              Корзина пуста
            </div>
            <button className="basket-empty__button" onClick={onClickClose}>
              <img
                className="basket-empty__button-img"
                src={arrow}
                alt="arrow"
              />
              Назад
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Basket;
