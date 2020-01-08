import React from "react";
import MovieContainer from "./MovieContainer";
import { Row } from "react-bootstrap";

function DisplayResults(props) {
  return (
    <Row className="results">
      {props.movie_results.length > 0 ? (
        props.movie_results.map((movie, index) => (
          <MovieContainer key={index} index={index} movie={movie} />
        ))
      ) : (
        <React.Fragment>
          <h4 className="no-results">Sorry No Results Found...</h4>
          {props.noResults && (
            <h5 className="no-results-subtitle">
              {props.customNoResultMessage}
            </h5>
          )}
        </React.Fragment>
      )}
    </Row>
  );
}

export default DisplayResults;
