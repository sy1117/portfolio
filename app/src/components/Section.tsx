import styles from "./Section.module.scss";

const Section: React.FC = ({ children }) => (
    <section className={styles.root}>
        <div className={styles.content}>{children}</div>
    </section>
)

export default Section;