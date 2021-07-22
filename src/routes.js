import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Discover from "./components/Discover";
import Favorites from "./components/Favorites";
import Ratings from "./components/Ratings";
import SearchResults from "./components/SearchResults";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" exact component={About} />
      <Route path="/discover" exact component={Discover} />
      <Route path="/myfavorites" exact component={Favorites} />
      <Route path="/myratings" exact component={Ratings} />
      <Route path="/search" exact component={SearchResults} />
    </Switch>
  );
}
