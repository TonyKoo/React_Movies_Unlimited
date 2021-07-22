import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import {
  homePageDisplayOptions,
  selectionMaxResults,
  createSearchApiUrl,
  createApiUrl
} from "../config";

import DisplayResults from "./helpers/DisplayResults";
import PageHeader from "./pagecomponents/PageHeader";
import Paginator from "./helpers/Paginator";
import HomeSearchBar from "./helpers/HomeSearchBar";
import LoadingData from "./helpers/LoadingData";

export default function Home() {
  // Results Storage
  const [movieResults, setMovieResults] = useState([]);

  // For Search
  const [searchTerm, setSearchTerm] = useState("");
  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
  const [selection, setSelection] = useState(homePageDisplayOptions[0]);

  // For Pagination
  const [totalNumResults, setTotalNumResults] = useState(selectionMaxResults);
  const [currentPage, setCurrentPage] = useState(1);

  // For Loading Screen
  const [fetchingData, setFetchingData] = useState(true);

  // Initial Load
  useEffect(() => {
    handleListPreference(homePageDisplayOptions[0]);
  }, []);

  async function handleListPreference(selected) {
    setFetchingData(true);
    setSelection(selected);
    const response = await axios.get(createApiUrl(selected.value));
    const apiResults = response.data.results.slice(0, selectionMaxResults);
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

  async function handleSearch(selectPage = 1) {
    setFetchingData(true);
    setCurrentPage(selectPage);
    setSearchTerm(String(searchTerm).trim());
    const response = await axios.get(
      createSearchApiUrl(searchTerm, selectPage)
    );
    const apiResults = response.data.results;
    setTotalNumResults(response.data.total_results);
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

  const handleInputKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handlePageChange = e => {
    handleSearch(e);
  };

  const handleSearchInput = e => {
    setSearchTerm(e.target.value);
    if (String(e.target.value).trim().length > 0) {
      setSearchButtonDisabled(false);
    } else {
      setSearchButtonDisabled(true);
    }
  };

  const handleClearSearchButton = () => {
    setSearchTerm("");
    setSearchButtonDisabled(true);
    handleListPreference(selection);
  };

  return (
    <div className="main-content">
      <PageHeader header_text="Welcome To Movies Unlimited" />
      <Container fluid>
        <HomeSearchBar
          searchTerm={searchTerm}
          handleSearchInput={handleSearchInput}
          handleInputKeyPress={handleInputKeyPress}
          searchButtonDisabled={searchButtonDisabled}
          handleClearSearchButton={handleClearSearchButton}
          handleListPreference={handleListPreference}
        />
        {!fetchingData ? (
          <React.Fragment>
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
