import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

const mount = (element, { onNavigate, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries : [initialPath]
  });

  /**
   * history has internal method (listen) that can be triggered with any route change
   * and it will call any passed function to ir
   */
  if (onNavigate) {
    history.listen(onNavigate);
  }
  ReactDOM.render(<App history={history} />, element)

  return {
    onParentNavigate: ({ pathname: nextPathName }) => {
      const { pathname } = history.location
      if (pathname !== nextPathName) {
        history.push(nextPathName);
      }
    }
  }
}

if(process.env.NODE_ENV === "development"){
  const devRoot = document.querySelector("#marketing-dev-root");
  if(devRoot)
    mount(devRoot, {
      defaultHistory: createBrowserHistory(),
    })
}

export {
  mount
}