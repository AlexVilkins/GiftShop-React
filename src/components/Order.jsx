import React from "react";

import close from "../assets/close.png";
import phone from "../assets/products/phone.png";
import { useSelector } from "react-redux";

function Order({ orderOpen, onClickClose }) {
  const orderTotal = useSelector(({ order }) => order);

  return (
    <div className={`${"order"} ${orderOpen ? "orderVisible" : ""}`}>
      <div className="order__container">
        <button className="order__close" onClick={onClickClose}>
          <img className="order__close-img" src={close} alt="delete" />
        </button>
        <div>
          {orderTotal.map((item) => (
            <div className="order__card" key={item.id}>
              {item.objs.map((objs, index) => {
                return (
                  <div className="order__item" key={index}>
                    <img className="order__item-img" src={phone} alt="logo" />
                    <div className="order__item-text">
                      <div>{objs.text}</div>
                      <div>{objs.newPrice}</div>
                    </div>
                  </div>
                );
              })}
              Заказ номер: #{item.orderNumber}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Order;
