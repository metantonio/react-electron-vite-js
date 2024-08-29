import React, { useState, useContext } from "react";
import { Context } from "./store/appContext.jsx";
import { BrowserRouter, Route, Router, Switch } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop.jsx";

import injectContext from "./store/appContext";

//import { Navbar } from "./components/Navbar2/navbar.jsx";

import Error404 from "./views/404/404.jsx";

import Login from "./views/Login/login.jsx";
import { Signup } from "./views/Login/signup.jsx";

//const IQgpt = React.lazy(() => import("./views/IQGPT/index.jsx"))


const LoadingComponent2 = () => {
  return (
    <div className="spinner-border text-warning" role="status" aria-hidden="true">
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = "";
  const { store, actions } = useContext(Context)

  return (
    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          {/* {store.logOutConfirmation ? <Navbar /> : <></>} */}
          <Switch>            
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup-iq">
              <Signup />
            </Route>
            {/* <Route exact path="/iq-gpt">
              <IQgpt />
            </Route> */}
            {/* <Route exact path="/iq-gpt">
              <React.Suspense fallback={<LoadingComponent2 />}>
                <IQgpt />
              </React.Suspense>
            </Route>      */}                        
                      
                                          

            <Route exact path="*">
              <Error404 />
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
