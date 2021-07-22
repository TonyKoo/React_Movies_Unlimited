import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "./pagecomponents/PageHeader";
import DisplayResults from "./helpers/DisplayResults";
import LoadingData from "./helpers/LoadingData";
import { Container } from "react-bootstrap";
import { getMovieDetailUrl } from "../config";

export default function Ratings() {
  // Results Storage
  const [movieResults, setMovieResults] = useState([]);

  // For Loading Screen
  const [fetchingData, setFetchingData] = useState(true);

  // No Rated Movies Flag
  const [noResults, setNoResults] = useState(true);

  // Initial Load
  useEffect(() => {
    let ratedMovies = localStorage.getItem("movieRatings");

    if (ratedMovies != null && fetchingData) {
      ratedMovies = ratedMovies ? JSON.parse(ratedMovies) : {};
      try {
        fetchData(Object.keys(ratedMovies));
      } catch (e) {
        console.log("Caught error: " + e.message);
      }
    } else {
      setFetchingData(false);
    }
  }, [fetchingData]);

  async function fetchData(ratedMovies) {
    const movieList = [];

    if (ratedMovies.length !== 0) {
      setNoResults(false);
    }

    for (let movie of ratedMovies) {
      const url = getMovieDetailUrl(movie);
      const response = await axios.get(url);
      movieList.push({
        poster: response.data.poster_path,
        title: response.data.title,
        release_date: response.data.release_date,
        rating: response.data.vote_average,
        summary: response.data.overview,
        id: response.data.id
      });
    }
    console.log(movieList);
    setMovieResults(movieList);
    setFetchingData(false);
  }

  return (
    <div className="main-content">
      <Container fluid>
        <PageHeader header_text="My Rated Movies" />
        {!fetchingData ? (
          <React.Fragment>
            <DisplayResults
              movie_results={movieResults}
              noResults={noResults}
              customNoResultMessage="You have no rated movies. Search for a movie and rate something!"
            />
          </React.Fragment>
        ) : (
          <LoadingData />
        )}
      </Container>
    </div>
  );
}
