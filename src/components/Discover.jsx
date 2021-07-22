import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";

import {
  selectionMaxResults,
  getGenreApiUrl,
  getDiscoverApiUrl,
  discoverSortOptions
} from "../config";

import DisplayResults from "./helpers/DisplayResults";
import PageHeader from "./pagecomponents/PageHeader";
import Paginator from "./helpers/Paginator";
import LoadingData from "./helpers/LoadingData";
import DiscoverSearchBar from "./helpers/DiscoverSearchBar";
import DiscoverSort from "./helpers/DiscoverSort";

export default function Discover() {
  // Results Storage
  const [movieResults, setMovieResults] = useState([]);

  // API Genres
  const [apiGenres, setApiGenres] = useState([]);

  // For Search
  const [genresSelected, setGenresSelected] = useState([]);
  const [searchYear, setSearchYear] = useState("");

  // For Pagination
  const [totalNumResults, setTotalNumResults] = useState(selectionMaxResults);
  const [currentPage, setCurrentPage] = useState(1);

  // For Loading Screen
  const [fetchingData, setFetchingData] = useState(true);

  // For Sort Option
  const [sortOption, setSortOption] = useState(discoverSortOptions[0]);

  // Initial Load - Inject Genres Into Select, Then Populate Discover
  useEffect(() => {
    axios.get(getGenreApiUrl()).then(({ data }) => {
      setApiGenres(
        data.genres.map(
          genre => (genre = { value: genre.id, label: genre.name })
        )
      );
    });

    handleSearch(getDiscoverApiUrl());
  }, []);

  const handlePageChange = e => {
    handleSearch(sortOption, e);
  };

  const handleSearchYearChange = e => {
    setSearchYear(e.target.value);
  };

  const HandleGenrePreference = e => {
    setGenresSelected(e);
  };

  const handleSubmitClick = e => {
    e.preventDefault();
    handleSearch(
      getDiscoverApiUrl(sortOption, currentPage, genresSelected, searchYear)
    );
  };

  const handleSortChange = e => {
    setSortOption(e);
    handleSearch(getDiscoverApiUrl(e, currentPage, genresSelected, searchYear));
  };

  const handleYearValidate = e => {
    if (String(e.target.value).trim() === "") {
      setSearchYear("");
    } else if (e.target.value < 1920) {
      setSearchYear(1920);
    } else if (e.target.value > 2020) {
      setSearchYear(2020);
    }
  };

  async function handleSearch(apiUrl, selectPage = 1) {
    setFetchingData(true);
    setCurrentPage(selectPage);

    const response = await axios.get(apiUrl);
    const apiResults = response.data.results.slice(0, selectionMaxResults);
    // Change to response.data.total_results and remove slice to
    // unlock all results instead of restricted to Top 12
    setTotalNumResults(selectionMaxResults);
    setMovieResults(
      apiResults.map(
        movie =>
          (movie = {
            poster: movie.poster_path,
            title: movie.title,
            release_date: movie.release_date,
            rating: movie.vote_average,
            summary: movie.overview,
            id: movie.id
          })
      )
    );

    setFetchingData(false);
  }

  return (
    <div className="main-content">
      <Container fluid>
        <PageHeader header_text="Discover Movies" />
        <DiscoverSearchBar
          apiGenres={apiGenres}
          genresSelected={genresSelected}
          HandleGenrePreference={HandleGenrePreference}
          handleYearValidate={handleYearValidate}
          searchYear={searchYear}
          handleSearchYearChange={handleSearchYearChange}
          handleSubmitClick={handleSubmitClick}
        />
        {!fetchingData ? (
          <React.Fragment>
            {movieResults.length > 0 && (
              <DiscoverSort
                sortOption={sortOption}
                handleSortChange={handleSortChange}
              />
            )}
            <Paginator
              onChange={handlePageChange}
              currentPage={currentPage}
              totalItems={totalNumResults}
            />
            <DisplayResults movie_results={movieResults} />
            <Paginator
              onChange={handlePageChange}
              currentPage={currentPage}
              totalItems={totalNumResults}
            />
          </React.Fragment>
        ) : (
          <LoadingData />
        )}
      </Container>
    </div>
  );
}
