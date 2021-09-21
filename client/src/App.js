import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// constants
import { USER_PATH } from "./constants/routes";
// components
import Loading from "./components/loading/Loading";
// pages
const Main = lazy(() => import("./pages/main/Main"));
const User = lazy(() => import("./pages/user/User"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path={USER_PATH} component={User} />
          <Route component={Main} />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
