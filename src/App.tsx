import React, {FC, lazy, Suspense, ReactElement} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

import ErrorBoundaries from "./components/ErrorHandler/ErrorBoundaries";
import Root from "containers/Root";

const App: FC = (): ReactElement => {
  return (
    <ErrorBoundaries>
      <Root iniStore={{} as any}>
        <Suspense fallback={null}>
          <Router basename="/">
            <Routes>
              <Route path="/" element={<div>Apps List</div> /*AppsList*/}/>
              <Route path="/edit" element={<div>App Edit</div> /*AppEdit*/}/>
              <Route path="/*" element={<div>Apps List</div> /*AppsList*/}/>
            </Routes>
          </Router>
        </Suspense>
      </Root>
    </ErrorBoundaries>
  );
};

export default App;
