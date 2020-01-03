import React from "react";

function Poster(props) {
  var imageUrl = "";
  props.image != null
    ? (imageUrl = "https://image.tmdb.org/t/p/w200/" + props.image)
    : (imageUrl = "./images/comingsoon.jpg");
  return <img src={imageUrl} alt={props.movieTitle} className="movie-poster" />;
}

export default Poster;
