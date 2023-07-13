import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { StylesProvider, createGenerateClassName } from "@material-ui/core";
// components
import Header from './components/Header';
import Progress from './components/Progress';
// modules
const MarketingApp = lazy(() => import("./components/MarketingApp"));
const AuthApp = lazy(() => import("./components/Authentication"));

const generateClassName = createGenerateClassName({
  productionPrefix: "con", 
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log({isSignedIn})
  return(
    <BrowserRouter>
      <StylesProvider generateClassName={generateClassName}>
        <div>
          <Header isSignedIn={isSignedIn} onSignOut={() => setIsSignedIn(false)}/>
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth" >
                <AuthApp onSignIn={() => setIsSignedIn(true)} />
              </Route>
              <Route path="/" >
                <MarketingApp/>
              </Route>
            </Switch>
          </Suspense>
        </div>
      </StylesProvider>
    </BrowserRouter>
  )
};
