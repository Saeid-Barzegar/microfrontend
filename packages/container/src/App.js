import React, { lazy, Suspense, useState, useEffect } from 'react'
import { Router, Switch, Route, Redirect } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
import { createBrowserHistory } from "history"
// components
import Header from './components/Header';
import Progress from './components/Progress';
// modules
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/Authentication"));
const DashboardApp = lazy(() => import("./components/Dashboard"));

const generateClassName = createGenerateClassName({
  productionPrefix: "con", 
});

const history = createBrowserHistory();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  
  useEffect(() => {
    if (isSignedIn) {
      console.log("signed in")
      history.push('/dashboard')
    }
  }, [isSignedIn])
  
  return(
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth" >
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/dashboard" >
                {!isSignedIn && <Redirect to="/"/>}
                <DashboardApp/>
              </Route>
              <Route path="/" >
                <MarketingApp/>
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </Router>
  )
};
