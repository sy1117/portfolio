import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import PortfolioPage from "../pages/Portfolio";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route path="*" component={PortfolioPage}></Route>
        </Switch>
    </BrowserRouter>
)

export default Router;