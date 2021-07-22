import React, { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "./pagecomponents/PageHeader";
import DisplayResults from "./helpers/DisplayResults";
import LoadingData from "./helpers/LoadingData";
import { Container } from "react-bootstrap";
import { getMovieDetailUrl } from "../config";

export default function Favorites() {
  // Results Storage
  const [movieResults, setMovieResults] = useState([]);

  // For Loading Screen
  const [fetchingData, setFetchingData] = useState(true);

  // No Favorites Flag
  const [noResults, setNoResults] = useState(true);

  // Initial Load
  useEffect(() => {
    let favourites = localStorage.getItem("favMovies");
    let favouritesArray = [];

    if (favourites != null && fetchingData) {
      favouritesArray = favourites ? favourites.split(",") : [];
      try {
        fetchData(favouritesArray);
      } catch (e) {
        console.log("Caught error: " + e.message);
      }
    } else {
      setFetchingData(false);
    }
  }, [fetchingData]);

  async function fetchData(favouritesArray) {
    const movieList = [];

    if (favouritesArray.length !== 0) {
      setNoResults(false);
    }

    for (let id of favouritesArray) {
      const url = getMovieDetailUrl(id);
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
    setMovieResults(movieList);
    setFetchingData(false);
  }

  return (
    <div className="main-content">
      <Container fluid>
        <PageHeader header_text="My Favorites" />
        {!fetchingData ? (
          <React.Fragment>
            <DisplayResults
              movie_results={movieResults}
              noResults={noResults}
              customNoResultMessage="You have no favourited movies. Search/Discover a movie to add to your favourites!"
            />
          </React.Fragment>
        ) : (
          <LoadingData />
        )}
      </Container>
    </div>
  );
}
