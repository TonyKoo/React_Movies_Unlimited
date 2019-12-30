import React from "react";
import Routes from "../routes";
import Navigation from "./Navigation";

function App(props) {
  return (
    <div className="container">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
