import React from "react";

import { AppContext } from "../App";
import close from "../assets/close.png";
import phone from "../assets/products/phone.png";

function Order({ orderOpen, onClickClose }) {
  const { orderTotal } = React.useContext(AppContext);

  return (
    <div className={`${"order"} ${orderOpen ? "orderVisible" : ""}`}>
      <div className="order__container">
        <button className="order__close" onClick={onClickClose}>
          <img className="order__close-img" src={close} alt="delete" />
        </button>
        <div>
          {orderTotal.map((item) => (
            <div className="order__card" key={item.id}>
              {Object.keys(item).map((key, index) => {
                if (key !== "orderNumber") {
                  return (
                    <div className="order__item" key={index}>
                      <img className="order__item-img" src={phone} alt="logo" />
                      <div className="order__item-text">
                        <div>{item[key].text}</div>
                        <div>{item[key].newPrice}</div>
                      </div>
                    </div>
                  );
                } else return null;
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
