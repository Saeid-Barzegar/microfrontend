import React from 'react'
import { Switch, Route, Router } from "react-router-dom"


import Landing from "./components/Landing";
import Pricing from "./components/Pricing";
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

/**
 * to prevent classname collission 
 * because of using same ui framework 
 * on both container and remote apps
 */
const generateClassName = createGenerateClassName({
  productionPrefix: "ma", // will add ma prefix to all classes
});

export default ({ history }) => {
  return(
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history} > {/**Router doesn't have history */}
          <Switch>
            <Route path="/pricing" component={Pricing} exact/>
            <Route path="/" component={Landing}/>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}