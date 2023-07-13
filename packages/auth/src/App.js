import React from 'react'
import { Switch, Route, Router } from "react-router-dom"


import Signin from "./components/Signin";
import Signup from "./components/Signup";
import { StylesProvider, createGenerateClassName } from '@material-ui/core';

/**
 * to prevent classname collission 
 * because of using same ui framework 
 * on both container and remote apps
 */
const generateClassName = createGenerateClassName({
  productionPrefix: "au", // will add ma prefix to all classes
});

export default ({ history, onSignIn }) => {
  return(
    <div>
      <StylesProvider generateClassName={generateClassName}>
        <Router history={history} > {/**Router doesn't have history */}
          <Switch>
            <Route path="/auth/signup" exact>
              <Signup onSignIn={onSignIn} />
            </Route>
            <Route path="/auth/signin" >
              <Signin onSignIn={onSignIn}/>
            </Route>
          </Switch>
        </Router>
      </StylesProvider>
    </div>
  )
}