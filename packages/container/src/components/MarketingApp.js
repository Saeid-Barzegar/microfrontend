import React, { useRef, useEffect } from 'react'
import { mount as mountMarketing } from 'marketing/MarketingApp'
import { useHistory } from "react-router-dom"

export default () => {
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    const { onParentNavigate } = mountMarketing(ref.current, {
      initialPath: history.location.pathname,
      onNavigate: location => {
        const nextPathName = location.pathname;
        const { pathname } = history.location;
        if (pathname !== nextPathName) {
          history.push(nextPathName);
        }
      }
    });
    history.listen(onParentNavigate)
  }, []);
  
  return (
    <div ref={ref} />
  )
}