import styles from "./Card.module.scss";

const Card: React.FC = () => {
    return (
        <div className={styles.card}>
            <div className={styles["card-details"]}>
                <div className={styles.name}>Kim Soyoung</div>
                <div className={styles.occupation}>Front-end Developer</div>
                <div className={styles.about}>
                    <div className={styles.item}>
                        <span className={styles.value}>
                            <a href="http://github.com/sy1117">sy1117</a>
                        </span>
                        <span className={styles.label}>Github</span>
                    </div>
                    <div className={styles.item}>
                        <span className={styles.value}>soyou6358@gmail.com</span>
                        <span className={styles.label}>Email</span>
                    </div>
                </div >
                <div className={styles.skills}>
                    <span className={styles.label}>Likes💜</span>
                    <span className={styles.value}>
                        #여행✈️
                        #독서📚
                        #수영🏊🏻‍♀️ #실내-클라이밍🧗🏻‍♂️ #헬스🏋🏻 #스노보드🏂 #서핑 🏄🏻‍♀️<br />
                    </span>
                </div>
            </div >
            <div className={styles.me}>
                <img src="./images/me.png" alt="me" />
            </div>
        </div >

    )
}

export default Card;
