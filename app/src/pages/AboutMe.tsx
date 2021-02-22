// import Portfolio÷Content from "../contents/Portfolio.md";
import Card from "../components/Card";
import Markdown from "../components/Markdown";
import Section from "../components/Section";
import Experience from "../contents/Experience.md";

const AboutMePage = () => {
    return (
        <Section>
            <Card />

            <Markdown file={Experience} />
            <div>
            </div>
        </Section>
    )
}

export default AboutMePage;