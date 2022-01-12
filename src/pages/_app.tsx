import React from "react";
import Header from "../components/Header";
import "../styles/globals.scss";

if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  const ReactDOM = require("react-dom");
  const axe = require("@axe-core/react");
  axe(React, ReactDOM, 1000);
}

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
