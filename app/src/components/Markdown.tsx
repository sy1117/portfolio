
import md2json from "md-2-json";
import { useEffect, useState } from "react";

const H1: React.FC = ({ children }) => <h1>{children}</h1>
const H2: React.FC = ({ children }) => <h2>{children}</h2>
const H3: React.FC = ({ children }) => <h3>{children}</h3>
const H4: React.FC = ({ children }) => <h4>{children}</h4>
const H5: React.FC = ({ children }) => <h5>{children}</h5>
const P: React.FC = ({ children }) => <p style={{ whiteSpace: 'pre-wrap', display: "inline-block" }}>{children}</p>
const SPAN: React.FC = ({ children }) => <span style={{ whiteSpace: 'pre-line', display: "inline-block" }}>{children}</span>

const Elems = [H2, H3, H4, H5, P];

// const parser = async (data: any) => {
//     // const data = await fetch(path)
//     //     .then((res) => res.text())
//     //     .then((md) => md2json.parse(md))

//     // return <div>tste</div>

//     return getChild(data, 0);
// }

const text = (data: string) => {
    return bold(data)
}

const bold = (data: string) => {
    const splitText = data.split('**');
    return (
        <>
            {splitText.map((text, i) => {
                if (!!(i % 2)) return <b style={{ fontWeight: 'bold' }}>{text}</b>
                return text ? <SPAN>{text}</SPAN> : ""
            })}
        </>
    );
}

function getChild(data: any, depth: number): any {
    let Component = Elems[depth];
    return Object.keys(data).map((key: any) => {
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


const Markdown: React.FC<{ file: any }> = ({ file }) => {

    const [content, setContent] = useState<any>({})

    useEffect(() => {
        const fetchContent = async () => {
            const data = await fetch(file)
                .then((res) => res.text())
                .then((md) => md2json.parse(md))
            setContent(data);
        }
        fetchContent();
    }, [])

    return (
        <>{getChild(content, 0)}</>
    )
}

export default Markdown;

