import React from "react";
import Truncate from "react-truncate";
import { movieSummary } from "../../config";

function MovieSummary(props) {
  return (
    <p className={props.modal ? "modal-summary" : "movie-summary"}>
      {props.truncate_text ? (
        <Truncate
          lines={movieSummary.truncateLines}
          trimWhitespace={movieSummary.trimWhiteSpace}
          ellipsis={movieSummary.ellipsis}
        >
          {props.movie_summary}
        </Truncate>
      ) : (
        <React.Fragment>
          <span className="modal-summary-category">Summary: </span>
          {props.movie_summary}
        </React.Fragment>
      )}
    </p>
  );
}

export default MovieSummary;
