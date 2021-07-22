import React from "react";

function MoviePosterTitle(props) {
  var imageUrl = "";
  props.image != null
    ? (imageUrl = "https://image.tmdb.org/t/p/w200" + props.image)
    : (imageUrl = "./images/comingsoon.jpg");
  return (
    <React.Fragment>
      <img src={imageUrl} alt={props.movie_title} className="movie-poster" />
      <h5 className="movie-title">{props.movie_title}</h5>
    </React.Fragment>
  );
}

export default MoviePosterTitle;
