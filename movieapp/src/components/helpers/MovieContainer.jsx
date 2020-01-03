import React from "react";
import { Col } from "react-bootstrap";

import DisplayMovie from "./DisplayMovie";

function MovieContainer(props) {
  return (
    <Col md={6} lg={3} className="movie-container">
      <DisplayMovie movie={props.movie} />
    </Col>
  );
}

export default MovieContainer;
