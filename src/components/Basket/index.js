import styles from "./Basket.module.scss";
import React from "react";
import { AppContext } from "../../App";

function Basket({ basketOpen, onClickClose, addedItems = [], onRemoveItem }) {
  const { basketPrice } = React.useContext(AppContext);

  return (
    <div
      className={`${styles.basket} ${basketOpen ? styles.basketVisible : ""}`}
    >
      <div className={styles.container}>
        <div className="title">Корзина</div>
        <button className={styles.closeBasket} onClick={onClickClose}>
          <img
            className={styles.closeBasket_img}
            src="/close.png"
            alt="delete"
          />
        </button>
        {addedItems.length ? (
          <div>
            {addedItems.map((item, index) => (
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
            <div className={styles.footer}>
              <div className={styles.total}>
                <div>Итого:</div>

                <div>{basketPrice() ? basketPrice() : 0} P</div>
              </div>
              <button className={styles.push}>
                Заказать
                <img src="/arrow.png" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className={styles.empty}>Корзина пуста</div>
        )}
      </div>
    </div>
  );
}

export default Basket;
