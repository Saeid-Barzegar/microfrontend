import React, { useRef, useEffect } from 'react'
import { mount as mountAuth } from 'authentication/AuthApp'
import { useHistory } from "react-router-dom"

export default ({ onSignIn }) => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mountAuth(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: location => {
        const nextPathName = location.pathname;
        const { pathname } = history.location;
        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      },
      onSignIn,
    });
    history.listen(onParentNavigate)
  }, []);
  
  return (
    <div ref={ref} />
  )
}