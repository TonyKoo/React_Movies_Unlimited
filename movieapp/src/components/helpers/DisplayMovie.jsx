import React from "react";
import Moment from "react-moment";
import Poster from "./Poster";

function DisplayMovie(props) {
  return (
    <React.Fragment>
      <Poster image={props.movie.poster} movieTitle={props.movie.title} />
      <h5 className="movie-title">{props.movie.title}</h5>
      <p className="movie-release-rating">
        {props.movie.release_date !== "" && (
          <React.Fragment>
            <Moment parse="YYYY-MM-DD" format="MMMM DD, YYYY">
              {props.movie.release_date}
            </Moment>
            <span> - </span>
          </React.Fragment>
        )}

        <span className="movie-rating">[{props.movie.rating * 10}%]</span>
      </p>
      <p className="movie-summary">{props.movie.summary}</p>
    </React.Fragment>
  );
}

export default DisplayMovie;
