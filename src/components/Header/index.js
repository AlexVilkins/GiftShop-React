import styles from "./Header.module.scss";

function Header({ onClickBasket, onClickFavorite, filterVal, onChangeFilter }) {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <img src="/img.png" alt="logo" />
      </div>
      <div className={styles.filter}>
        <img src="/filter.png" alt="filter" />
        <input
          type="text"
          placeholder="Поиск товара"
          value={filterVal}
          onChange={onChangeFilter}
        />
      </div>
      <div className={styles.panel}>
        <div className={styles.favorite} onClick={onClickFavorite}>
          <img src="/prodCard/heart.png" alt="favorite"></img>
          <div className="panel__favorite-text">Избранное</div>
        </div>
        <div className={styles.basket} onClick={onClickBasket}>
          <img
            className="panel__basket-img"
            src="/busket.svg"
            alt="busket"
          ></img>
          <div className="panel__basket-text">Корзина</div>
        </div>
        <div className={styles.setup}>
          <img src="/setup.svg" alt="setup"></img>
          <div>Войти</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
