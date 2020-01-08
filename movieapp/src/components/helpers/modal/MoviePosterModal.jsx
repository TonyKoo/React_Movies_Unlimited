import React from "react";

function MoviePosterModal(props) {
  var imageUrl = "";
  props.image != null
    ? (imageUrl = "https://image.tmdb.org/t/p/w500" + props.image)
    : (imageUrl = "./images/comingsoonlarge.jpg");
  return (
    <React.Fragment>
      <img src={imageUrl} alt={props.movie_title} className="movie-poster" />
    </React.Fragment>
  );
}
export default MoviePosterModal;
