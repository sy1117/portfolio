import { BrowserRouter, Route, Switch } from "react-router-dom";
import AboutMePage from "../pages/AboutMe";
import PortfolioPage from "../pages/Portfolio";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/portfolio" component={PortfolioPage}></Route>
            <Route path="/about-me" component={AboutMePage}></Route>
        </Switch>
    </BrowserRouter>
)

export default Router;