import React from "react";
import { Button } from "react-bootstrap";

function FavoriteButton(props) {


  return (
    <Button
      variant="secondary"
      movie-id={props.movieId}
      onClick={props.handleFavoriteButton}
    >
      <img
        src={props.isFavorite ? "./images/fav.png" : "./images/notFav.png"}
        alt="favorite button"
      />
    </Button>
  );
}

export default FavoriteButton;
