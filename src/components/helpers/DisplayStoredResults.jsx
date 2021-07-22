import React from "react";
import { Row } from "react-bootstrap";
import MovieContainer from "./MovieContainer";
import { getMovieDetailUrl } from "../../config";
import axios from "axios";

function DisplayStoredResults(props) {
  async function fetchSingleMovie(movie_id) {
    const response = await axios.get(getMovieDetailUrl(movie_id));
    const apiResult = await response.data;
    return processApiResult(apiResult);
  }

  function processApiResult(apiResult) {
    return {
      poster: apiResult.poster_path,
      title: apiResult.title,
      release_date: apiResult.release_date,
      rating: apiResult.vote_average,
      summary: apiResult.overview,
      id: apiResult.id
    };
  }
  console.log(fetchSingleMovie(props.moviesInStorage[0]));
  return (
    <Row className="results">
      {props.moviesInStorage.length > 0 ? (
        props.moviesInStorage.map((movie_id, index) => (
          <MovieContainer
            key={index}
            index={index}
            movie={fetchSingleMovie(movie_id)}
          />
        ))
      ) : (
        <h4 className="no-results">Sorry No Results Found...</h4>
      )}
    </Row>
  );
}

export default DisplayStoredResults;
