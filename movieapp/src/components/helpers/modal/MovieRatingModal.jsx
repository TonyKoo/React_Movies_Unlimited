import React from "react";

function MovieRatingModal(props) {
  return (
    <p>
      <span className="modal-summary-category">Movie Rating:</span>{" "}
      {props.movie_rating * 10}%
    </p>
  );
}

export default MovieRatingModal;
