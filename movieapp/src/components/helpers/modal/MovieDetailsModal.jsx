import React, { useState } from "react";
import { ratingSelectOptions } from "../../../config";
import {
  Button,
  Col,
  Container,
  Modal,
  Row,
  ButtonGroup
} from "react-bootstrap";
import MovieSummary from "../MovieSummary";
import MoviePosterModal from "./MoviePosterModal";
import MovieRelaseModal from "./MovieReleaseModal";
import MovieRatingModal from "./MovieRatingModal";
import FavoriteButton from "../FavoriteButton";
import MovieMyRating from "./MovieMyRating";

function MovieDetailsModal(props) {
  const [showDetails, setShowDetails] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    fetchFavoritesFromStorage().includes(String(props.movie.id))
  );

  const [myMovieRating, setMyMovieRating] = useState(
    ratingSelectOptions[fetchMyRatingFromStorage()]
  );

  function fetchFavoritesFromStorage() {
    let storageFavMovies = localStorage.getItem("favMovies");
    storageFavMovies = storageFavMovies ? storageFavMovies.split(",") : [];

    return storageFavMovies;
  }

  function fetchMyRatingFromStorage() {
    let theRating = 0;
    let storageMovieRatings = localStorage.getItem("movieRatings");
    storageMovieRatings = storageMovieRatings
      ? JSON.parse(storageMovieRatings)
      : {};

    if (storageMovieRatings.hasOwnProperty(String(props.movie.id))) {
      theRating = storageMovieRatings[String(props.movie.id)];
    }

    return theRating;
  }

  const handleCloseDetails = () => setShowDetails(false);
  const handleShowDetails = () => setShowDetails(true);

  const handleFavoriteButton = () => {
    let updatedFavList = fetchFavoritesFromStorage();

    if (isFavorite) {
      updatedFavList = updatedFavList.filter(e => e !== String(props.movie.id));
      setIsFavorite(false);
    } else {
      updatedFavList.push(String(props.movie.id));
      setIsFavorite(true);
    }

    // Save back to localStorage
    localStorage.setItem("favMovies", updatedFavList);
  };

  const handleRatingChange = e => {
    // Fetch Local Storage
    let storageMovieRatings = localStorage.getItem("movieRatings");
    storageMovieRatings = storageMovieRatings
      ? JSON.parse(storageMovieRatings)
      : {};

    // Determine if rating should be removed or updated
    if (
      e.value === 0 &&
      storageMovieRatings.hasOwnProperty(String(props.movie.id))
    ) {
      delete storageMovieRatings[`${String(props.movie.id)}`];
    } else {
      storageMovieRatings[String(props.movie.id)] = e.value;
    }

    // Update Local Storage
    localStorage.setItem("movieRatings", JSON.stringify(storageMovieRatings));
    setMyMovieRating(e);
  };

  return (
    <React.Fragment>
      <ButtonGroup>
        <Button variant="primary" onClick={handleShowDetails}>
          More Info
        </Button>
      </ButtonGroup>
      <ButtonGroup className="ml-4">
        <FavoriteButton
          className="mr-4"
          isFavorite={isFavorite}
          movieId={props.movie.id}
          handleFavoriteButton={handleFavoriteButton}
        />
      </ButtonGroup>

      <Modal show={showDetails} onHide={handleCloseDetails} size={"xl"}>
        <Modal.Header closeButton>
          <Modal.Title>{props.movie.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col md={6}>
                <MoviePosterModal image={props.movie.poster} />
              </Col>
              <Col>
                <MovieRelaseModal release_date={props.movie.release_date} />
                <MovieRatingModal movie_rating={props.movie.rating} />
                {props.movie.release_date !== "" && (
                  <MovieMyRating
                    myMovieRating={myMovieRating}
                    handleRatingChange={handleRatingChange}
                  />
                )}
                <MovieSummary
                  movie_summary={props.movie.summary}
                  modal={true}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <ButtonGroup className="ml-4">
            <FavoriteButton
              className="mr-4"
              isFavorite={isFavorite}
              movieId={props.movie.id}
              handleFavoriteButton={handleFavoriteButton}
            />
          </ButtonGroup>
          <Button variant="primary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </React.Fragment>
  );
}

export default MovieDetailsModal;
