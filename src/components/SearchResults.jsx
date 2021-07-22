import React, { useEffect, useState } from "react";
import axios from "axios";
import { createSearchApiUrl } from "../config";

import PageHeader from "./pagecomponents/PageHeader";
import { Container } from "react-bootstrap";
import DisplayResults from "./helpers/DisplayResults";
import Paginator from "./helpers/Paginator";
import LoadingData from "./helpers/LoadingData";

function SearchResults(props) {
  // Results Storage
  const [movieResults, setMovieResults] = useState([]);

  // For Search
  const [searchTerm, setSearchTerm] = useState("");
  //   const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);

  // For Pagination
  const [totalNumResults, setTotalNumResults] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // For Loading Screen
  const [fetchingData, setFetchingData] = useState(true);

  // Initial Load
  useEffect(() => {
    var apiURL = createSearchApiUrl(props.location.searchTerm, currentPage);
    setFetchingData(true);
    if (props.location.searchTerm !== searchTerm) {
      setCurrentPage(1);
      apiURL = createSearchApiUrl(props.location.searchTerm);
    }

    axios
      .get(apiURL)
      .then(({ data }) => {
        processApiResults(data.results);
        setTotalNumResults(data.total_results);
      })
      .then(setSearchTerm(props.location.searchTerm));
  }, [props.location.searchTerm, currentPage, searchTerm]);

  async function handleSearch(selectPage) {
    setFetchingData(true);
    setCurrentPage(selectPage);
    setSearchTerm(String(searchTerm).trim());
    const response = await axios.get(
      createSearchApiUrl(searchTerm, selectPage)
    );
    const apiResults = response.data.results;
    setTotalNumResults(response.data.total_results);
    processApiResults(apiResults);
  }

  function processApiResults(apiResults) {
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

  const handlePageChange = e => {
    handleSearch(e);
  };

  return (
    <div className="main-content">
      <Container fluid>
        <PageHeader header_text="Search Results" />
        {searchTerm !== undefined ? (
          <React.Fragment>
            {!fetchingData ? (
              <React.Fragment>
                <p className="search-breadcrumb">Search > {searchTerm}</p>
                <Paginator
                  onChange={handlePageChange}
                  currentPage={currentPage}
                  totalItems={totalNumResults}
                />
                <DisplayResults
                  movie_results={movieResults}
                  search_term={searchTerm}
                />
                <Paginator
                  onChange={handlePageChange}
                  currentPage={currentPage}
                  totalItems={totalNumResults}
                />
              </React.Fragment>
            ) : (
              <LoadingData />
            )}
          </React.Fragment>
        ) : (
          <h4 className="no-results">Please Use The Search Box...</h4>
        )}
      </Container>
    </div>
  );
}

export default SearchResults;
