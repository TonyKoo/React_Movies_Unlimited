import React from "react";
import Routes from "../routes";
import Navigation from "./Navigation";
import Footer from "./Footer";

function App(props) {
  return (
    <div className="container-fluid">
      <Navigation />
      <div className="container">
        <Routes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
