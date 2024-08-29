import Versions from './components/Versions'
import electronLogo from './assets/electron.svg'
import React, { useState, useContext } from "react";
import { Context } from "./store/appContext.jsx";
//import { BrowserRouter, Route, Router, Switch, Suspense, lazy } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop.jsx";
import injectContext from "./store/appContext";

const App = () => {
  const ipcHandle = () => window.electron.ipcRenderer.send('ping')
  const { store, actions } = useContext(Context);

  return (
    <>
      <img alt="logo" className="logo" src={electronLogo} />
      <div className="creator">Powered by electron-vite</div>
      <div className="text">
        Build an Electron app with <span className="react">React</span>
      </div>
      <p className="tip">
        Please try pressing <code>F12</code> to open the devTool
      </p>
      <div className="actions">
        <div className="action">
          <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
            Documentation
          </a>
        </div>
        <div className="action">
          <a target="_blank" rel="noreferrer" onClick={ipcHandle}>
            Send IPC
          </a>
        </div>
      </div>
      <Versions></Versions>
    </>
  )
}

export default injectContext(App);

