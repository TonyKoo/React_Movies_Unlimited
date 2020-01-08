import React from "react";
import MovieDetailsModal from "./modal/MovieDetailsModal";

function MoreInfoButton(props) {
  return (
    <React.Fragment>
      {/* This is Used For Spacing The Container */}
      <div className="movie-moreinfopadder">
        <MovieDetailsModal movie={props.movie} isFavorite={props.isFavorite} />
      </div>
      {/* Actual Visible Content */}
      <div className="movie-moreinfo">
        <MovieDetailsModal movie={props.movie} />
      </div>
    </React.Fragment>
  );
}

export default MoreInfoButton;
