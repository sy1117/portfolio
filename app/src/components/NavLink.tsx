import { useRef, useState } from "react";
import Hamburger from "../icons/Hamburger";
import Close from "../icons/Close";
import styles from "./NavLink.module.scss"


interface INavLinks {
    title: string;
    href: string;
}

const NavLink = () => {

    const data: INavLinks[] = [
        { title: "🙋‍♀️ About Me", href: "/about-me" },
        { title: "🗃 Portfolio", href: "/portfolio" },
    ]

    const hamburgerRef = useRef(null)
    const [isOpen, setOpen] = useState<Boolean>(false);


    return (
        <>
            <nav className={styles.root}>
                {/* <div className={styles.content}> */}
                <ul className={styles.content} >
                    {!isOpen && <Hamburger className={styles.hamburger} ref={hamburgerRef} onClick={() => { setOpen(!isOpen); }} />}
                    {isOpen && <Close onClick={() => { setOpen(!isOpen); }} />}
                    <span className={styles.logo}><a> Hello, I'm So-Young</a></span>
                    {data.map(({ title, href }) =>
                        <li className={styles.list}><a href={href}>{title}</a></li>
                    )}
                </ul>
                <ul className={styles.mobile} data-open={isOpen}>
                    {data.map(({ title, href }) =>
                        <li><a href={href}>{title}</a></li>
                    )}
                </ul>
            </nav>
            {/* <div className={styles.placeholder}></div> */}
        </>
    )
}

export default NavLink;