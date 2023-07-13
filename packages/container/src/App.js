import React from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
// modules
import MarketingApp from "./components/MarketingApp";
import AuthApp from "./components/Authentication";

const generateClassName = createGenerateClassName({
  productionPrefix: "con", 
});

export default () => {
  
  return(
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header />
          <Switch>
            <Route path="/auth" component={AuthApp} />
            <Route path="/" component={MarketingApp} />
          </Switch>
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
};
