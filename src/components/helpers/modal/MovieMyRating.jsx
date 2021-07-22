import React from "react";
import Select from "react-select";
import { selectionBoxPrefs, ratingSelectOptions } from "../../../config";

function MovieMyRating(props) {
  return (
    <div className="rating-select">
      <span className="modal-summary-category">My Rating: </span>
      <Select
        isClearable={selectionBoxPrefs.isClearable}
        isSearchable={selectionBoxPrefs.isSearchable}
        className="dropdown"
        options={ratingSelectOptions}
        value={props.myMovieRating}
        onChange={props.handleRatingChange}
      />
    </div>
  );
}

export default MovieMyRating;
