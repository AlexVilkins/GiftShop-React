import styles from "./Card.module.scss";


function Card() {
    return (
        <div className={styles.card}>
            <img src="/products/phone.png" alt="phone"></img>
            <div className={styles.text}>Смартфоны</div>
        </div>
    )
}

export default Card