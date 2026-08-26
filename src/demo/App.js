import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

const DOCS_VERSION = "1.1.0";
const DOCS_PATH = `/v${DOCS_VERSION}`;
const AppCurrent = React.lazy(() => import("./v1.1.0"));
const AppPrevious = React.lazy(() => import("./v1.0.0"));

const Splash = () => {
  return <div style={{
                      height: "100vh",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#0078D7"
                    }}>
            <h1 style={{margin: "0 auto", color: "white"}}>
              @evanpatchouli/react-winui
            </h1>
          </div>
}

class App extends React.Component {
  render() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Navigate to={`${DOCS_PATH}/home`} />}/>
        <Route
          path={`${DOCS_PATH}/*`}
          element={<React.Suspense fallback={<Splash/>}><AppCurrent/></React.Suspense>}
        />
        <Route
          path="/v1.0.0/*"
          element={<React.Suspense fallback={<Splash/>}><AppPrevious/></React.Suspense>}
        />
      </Routes>
    </HashRouter>
    )
  }
}

export default App;
