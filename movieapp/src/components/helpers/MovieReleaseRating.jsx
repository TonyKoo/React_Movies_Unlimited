import React from "react";
import Moment from "react-moment";

function MovieReleaseRating(props) {
  return (
    <p className="movie-release-rating">
      {props.release_date !== "" && (
        <React.Fragment>
          <Moment parse="YYYY-MM-DD" format="MMMM DD, YYYY">
            {props.release_date}
          </Moment>
          <span> - </span>
        </React.Fragment>
      )}

      <span className="movie-rating">[{props.movie_rating * 10}%]</span>
    </p>
  );
}

export default MovieReleaseRating;
