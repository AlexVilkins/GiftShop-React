import styles from "./Order.module.scss";
import React from "react";
import { AppContext } from "../../App";

function Order({ orderOpen, onClickClose }) {
  const { orderTotal } = React.useContext(AppContext);

  return (
    <div className={`${styles.order} ${orderOpen ? styles.orderVisible : ""}`}>
      <div className={styles.container}>
        <button className={styles.closeOrder} onClick={onClickClose}>
          <img
            className={styles.closeOrder_img}
            src="/close.png"
            alt="delete"
          />
        </button>
        <div>
          {orderTotal.map((item) => (
            <div className={styles.order_card} key={item.id}>
              {Object.keys(item).map((key) => {
                if (key !== "orderNumber") {
                  return (
                    <div className={styles.order_item} key={key}>
                      <img
                        src={item[key].img}
                        alt="logo"
                        className={styles.order_img}
                      />
                      <div className={styles.order_text}>
                        <div>{item[key].text}</div>
                        <div>{item[key].newPrice}</div>
                      </div>
                    </div>
                  );
                }
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
