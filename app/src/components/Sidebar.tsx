import styles from "./Sidebar.module.scss"

const Sidebar = () => (
    <ol className={styles.root}>
        <li>
            <a href="#">Header1</a>
            <ol>
                <li>Header2</li>
                <li>Header2</li>
            </ol>
        </li>


    </ol>
)

export default Sidebar;