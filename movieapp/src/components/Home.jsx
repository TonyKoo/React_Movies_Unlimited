import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormControl
} from "react-bootstrap";
import {
  API_KEY,
  apiPrefs,
  selectionBoxPrefs,
  homePageDisplayOptions,
  selectionMaxResults
} from "../config";
import MovieContainer from "./helpers/MovieContainer";

function createApiUrl(
  apiSearchType = homePageDisplayOptions[0].apiSearch,
  page = 1
) {
  return (
    `https://api.themoviedb.org/3/movie/${apiSearchType}?` +
    `api_key=${API_KEY}` +
    `&language=${apiPrefs.language}` +
    `&region=${apiPrefs.region}` +
    `&page=${page}`
  );
}

function createSearchApiUrl(searchTerm, page = 1) {
  return (
    `https://api.themoviedb.org/3/search/movie/?` +
    `api_key=${API_KEY}` +
    `&language=${apiPrefs.language}` +
    `&region=${apiPrefs.region}` +
    `&page=${page}` +
    `&query=${searchTerm}`
  );
}

export default function Home() {
  const [movieResults, setMovieResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [selection, setSelection] = useState(homePageDisplayOptions[0]);

  useEffect(() => {
    axios.get(createApiUrl()).then(({ data }) => {
      setMovieResults(
        data.results.slice(0, selectionMaxResults).map(
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
    });
  }, []);

  async function handleListPreference(selected) {
    setSelection(selected);
    const response = await axios.get(createApiUrl(selected.apiSearch));
    const apiResults = response.data.results.slice(0, selectionMaxResults);
    processApiResults(apiResults);
  }

  async function handleSearch() {
    setSearchTerm(String(searchTerm).trim());
    const response = await axios.get(createSearchApiUrl(searchTerm));
    const apiResults = response.data.results;
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
  }
  const handleSearchInput = e => {
    setSearchTerm(e.target.value);
    if (String(e.target.value).trim().length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  };

  const handleInputKeyPress = e => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleClearSearchButton = e => {
    setSearchTerm("");
    setButtonDisabled(true);
    handleListPreference(selection);
  };

  return (
    <div className="Home">
      <Container fluid>
        <Row className="justify-content-center">
          <h1>Welcome To Movies Unlimited</h1>
        </Row>
        <Form>
          <Row>
            <Col md={4} lg={3}>
              <FormControl
                type="text"
                placeholder="Search Movies..."
                value={searchTerm}
                onChange={handleSearchInput}
                onKeyDown={handleInputKeyPress}
              />
            </Col>
            <Col md={3} lg={2}>
              <Button
                block
                variant="primary"
                disabled={buttonDisabled}
                onClick={handleClearSearchButton}
              >
                Clear Search
              </Button>
            </Col>
            <Col md={{ span: 5 }} lg={{ span: 3, offset: 4 }}>
              <Select
                isClearable={selectionBoxPrefs.isClearable}
                isSearchable={selectionBoxPrefs.isSearchable}
                options={homePageDisplayOptions}
                defaultValue={homePageDisplayOptions[0]}
                onChange={handleListPreference}
              />
            </Col>
          </Row>
        </Form>
        <Row className="results">
          {movieResults.length > 0 ? (
            movieResults.map((movie, index) => (
              <MovieContainer key={index} index={index} movie={movie} />
            ))
          ) : (
            <h4 className="no-results">Sorry No Results Found...</h4>
          )}
        </Row>
      </Container>
    </div>
  );
}
