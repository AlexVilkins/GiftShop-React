import styles from "./Footer.module.scss"
function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.block}>
                <div className={styles.block_title}>Компания</div>
                <div className={styles.block_text}>О нас</div>
                <div className={styles.block_text}>Магазины</div>
                <div className={styles.block_text}>Блог</div>
                <div className={styles.block_text}>Вакансии</div>
                <div className={styles.block_text}>Контакты</div>
                <div className={styles.block_text}>Партнерская программа</div>
            </div>
            <div className={styles.block}>
                <div className={styles.block_title}>Покупателям</div>
                <div className={styles.block_text}>Как сделать заказ</div>
                <div className={styles.block_text}>Оплата и доставка</div>
                <div className={styles.block_text}>Статус заказа</div>
                <div className={styles.block_text}>Возврат</div>
                <div className={styles.block_text}>Юридическая информация</div>
                <div className={styles.block_text}>Политика персональных данных</div>
            </div>
            <div className={styles.block_title}>Связь</div>
            <div className={styles.block_title}>Мы в сетях</div>
        </div>
    )
}

export default Footer