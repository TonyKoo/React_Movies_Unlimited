import React from "react";
import MoviePosterTitle from "./MoviePosterTitle";
import MovieReleaseRating from "./MovieReleaseRating";
import MovieSummary from "./MovieSummary";
import MoreInfoButton from "./MoreInfoButton";

function DisplayMovie(props) {
  return (
    <React.Fragment>
      <MoviePosterTitle
        image={props.movie.poster}
        movie_title={props.movie.title}
      />
      <MovieReleaseRating
        release_date={props.movie.release_date}
        movie_rating={props.movie.rating}
      />
      <MovieSummary
        movie_summary={props.movie.summary}
        truncate_text={true}
        modal={false}
      />
      <MoreInfoButton movie={props.movie} />
    </React.Fragment>
  );
}

export default DisplayMovie;
