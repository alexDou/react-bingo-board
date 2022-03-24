import React, {FC, lazy, Suspense, ReactElement} from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {Provider} from 'react-redux';

import store from 'store';
import ErrorBoundaries from "./components/ErrorHandler/ErrorBoundaries";
const AppsList = lazy(() => import("components/AppsList"));

const App: FC = (): ReactElement => {
  return (
    <ErrorBoundaries>
      <Provider store={store}>
        <Suspense fallback={null}>
          <Router basename="/">
            <Routes>
              <Route path="/" element={<AppsList/>}/>
              <Route path="/edit" element={<div>App Edit</div> /*AppEdit*/}/>
              <Route path="/*" element={<AppsList/>}/>
            </Routes>
          </Router>
        </Suspense>
      </Provider>
    </ErrorBoundaries>
  );
};

export default App;
