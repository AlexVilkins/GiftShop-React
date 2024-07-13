import styles from "./CategoriesCard.module.scss";


function CatCard({img, text}) {
    return (
        <div className={styles.card}>
            <img src={img} alt="phone"></img>
            <div className={styles.text}>{text}</div>
        </div>
    )
}

export default CatCard