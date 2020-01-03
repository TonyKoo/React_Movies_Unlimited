import React from "react";
import Routes from "../routes";
import Navigation from "./Navigation";

function App(props) {
  return (
    <div className="container-fluid">
      <Navigation />
      <div className="container">
        <Routes />
      </div>
    </div>
  );
}

export default App;
