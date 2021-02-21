// import Portfolio÷Content from "../contents/Portfolio.md";
import Markdown from "../components/Markdown";
import Section from "../components/Section";
import PortfolioContent from "../contents/Portfolio.md";

const PortfolioPage = () => {
    return (
        <Section>
            <Markdown file={PortfolioContent} />
        </Section>
    )
}

export default PortfolioPage;