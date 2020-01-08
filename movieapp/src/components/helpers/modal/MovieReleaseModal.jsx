import React from "react";
import Moment from "react-moment";

function MovieRelaseModal(props) {
  return (
    <p className="modal-movie-release">
      {props.release_date !== "" ? (
        <React.Fragment>
          <span className="modal-summary-category">Release Date: </span>
          <Moment parse="YYYY-MM-DD" format="MMMM DD, YYYY">
            {props.release_date}
          </Moment>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <span className="modal-summary-category">Release Date:</span> TBA
        </React.Fragment>
      )}
    </p>
  );
}

export default MovieRelaseModal;
