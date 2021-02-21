// import Portfolio÷Content from "../contents/Portfolio.md";
import md2json from "md-2-json";
import { useState, useEffect } from "react";
import Section from "../components/Section";
import PortfolioContent from "../contents/Portfolio.md";


const H1: React.FC = ({ children }) => <h1>{children}</h1>
const H2: React.FC = ({ children }) => <h2>{children}</h2>
const H3: React.FC = ({ children }) => <h3>{children}</h3>
const H4: React.FC = ({ children }) => <h4>{children}</h4>
const H5: React.FC = ({ children }) => <h5>{children}</h5>
const P: React.FC = ({ children }) => <p style={{ whiteSpace: 'pre', display: "inline-block" }}>{children}</p>

const Elems = [H2, H3, H4, H5, P];

const convert = (data: any) => {
    let depth = 0;
    return (getChild(data, depth))
}

const text = (data: string) => {
    return bold(data)
}

const bold = (data: string) => {
    const splitText = data.split('**');
    return (
        <p>
            {splitText.map((text, i) => {
                if (!!(i % 2)) return <b style={{ fontWeight: 'bold' }}>{text}</b>
                return <P>{text}</P>
            })}
        </p>
    );
}



function getChild(data: any, depth: number): any {
    let Component = Elems[depth];
    return Object.keys(data).map((key: any) => {
        console.log(key)
        return (
            <>
                {key === "raw" && <p>{text(data[key])}</p>}
                {key !== "raw" && (
                    <>
                        <Component>{text(key)}</Component>
                        {getChild(data[key], depth + 1)}
                    </>
                )}
            </>
        )
    });
}


const PortfolioPage = () => {

    const [content, setContent] = useState<any>({})

    useEffect(() => {
        const fetchContent = async () => {
            const data = await fetch(PortfolioContent)
                .then((res) => res.text())
                .then((md) => {
                    // this.setState({ md })
                    return md2json.parse(md)
                })
            setContent(data)
        }
        fetchContent();
    }, [])

    return (
        <Section>
            {convert(content)}
        </Section>
    )
    // {Object.keys(content).map((key: string) => {
    //let h2Elems = content[key]
    //     return (
    //         <>
    //             <h2>{key}</h2>
    //             {Object.keys(h2Elems).map((key) => {
    //                 let h3Elems = h2Elems[key]
    //                 return (
    //                     <>
    //                         <h3>{key}</h3>
    //                         {Object.keys(h3Elems).map((key) => {
    //                             let h4Elems = h3Elems[key];
    //                             return (
    //                                 <>
    //                                     {key === "raw" && <p>{h4Elems}</p>}
    //                                     {key !== "raw" && (
    //                                         <>
    //                                             <h4>{key}</h4>
    //                                             {Object.keys(h4Elems).map((key) => {
    //                                                 let h5Elems = h4Elems[key];
    //                                                 return (
    //                                                     <>
    //                                                         {key === "raw" && <p>{text(h4Elems[key])}</p>}
    //                                                         {key !== "raw" && <h5>{text(key)}</h5>}
    //                                                         {Object.keys(h4Elems).map((key) => {
    //                                                             let h6Elems = h5Elems[key];
    //                                                             console.log("h6", h5Elems, h6Elems)
    //                                                             return (
    //                                                                 <>
    //                                                                     {h6Elems}
    //                                                                     {h6Elems && key === "raw" && <p>{text(h5Elems[key])}</p>}
    //                                                                     {/* {key !== "raw" && <p>{text(key)}</p>} */}
    //                                                                 </>
    //                                                             )
    //                                                         })}
    //                                                     </>
    //                                                 )
    //                                             })}
    //                                         </>
    //                                     )}
    //                                 </>
    //                             )
    //                         })}
    //                     </>
    //                 )

    //             })}
    //         </>
    //     )
    // })}
    // </>
}

export default PortfolioPage;