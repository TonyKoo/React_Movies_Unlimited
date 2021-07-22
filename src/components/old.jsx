import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import moment from "moment";
import { Container, Row, Col } from "react-bootstrap";

import MovieContainer from "./helpers/MovieContainer";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [selectedOption, setSelectedOption] = useState({
    apiString: "popular"
  });
  const API_KEY = "86b812c9fc40b9c4ba12659bf6feb82a";

  const selectPrefs = {
    isClearable: false,
    isSearchable: false
  };

  const apiPrefs = {
    //Global Prefs
    language: "en-US",
    region: "US",
    include_adult: false,
    include_video: false,
    release_types: "1|2|3", //[Theatrical | Theatrical - Limited]

    //Top Rated Movies Settings
    minimum_vote_count: 500,

    //Upcoming Movie Settings
    upcoming_min_date: moment()
      .add(1, "days")
      .format("YYYY-MM-DD"),
    upcoming_max_date: moment()
      .add(60, "days")
      .format("YYYY-MM-DD"),

    //Now Playing Settings
    nowplaying_min_date: moment()
      .subtract(42, "days")
      .format("YYYY-MM-DD"),
    nowplaying_max_date: moment()
      .add(7, "days")
      .format("YYYY-MM-DD")
  };

  useEffect(() => {
    handleListPreference();
  }, [popularMovies]);

  // const movieDisplayOptions = [
  //   {
  //     api_sort: "popularity.desc",
  //     api_additional_criteria: ``,
  //     label: "Popular Movies"
  //   },
  //   {
  //     api_sort: "vote_average.desc",
  //     api_additional_criteria: `&vote_count.gte=${apiPrefs.minimum_vote_count}`,
  //     label: "Top Rated Movies"
  //   },
  //   {
  //     api_sort: "release_date.asc",
  //     api_additional_criteria: `&release_date.gte=${apiPrefs.upcoming_min_date}&release_date.lte=${apiPrefs.upcoming_max_date}`,
  //     label: "Upcoming Movies"
  //   },
  //   {
  //     api_sort: "release_date.asc",
  //     api_additional_criteria: `&release_date.gte=${apiPrefs.nowplaying_min_date}&release_date.lte=${apiPrefs.nowplaying_max_date}`,
  //     label: "Now Playing"
  //   }
  // ];

  const movieDisplayOptions = [
    {
      apiString: "popular",
      label: "Popular Movies"
    },
    {
      apiString: "top_rated",
      label: "Top Rated Movies"
    },
    {
      apiString: "upcoming",
      label: "Upcoming Movies"
    },
    {
      apiString: "now_playing",
      label: "Now Playing"
    }
  ];

  // useEffect(() => {
  //   handleListPreference();
  // }, [selection]);

  // async function fetchPopularMovies() {
  //   const url =
  //     "https://api.themoviedb.org/3/discover/movie?api_key=86b812c9fc40b9c4ba12659bf6feb82a&language=en-US&sort_by=popularity.desc";
  //   const response = await axios.get(url);
  //   const popularMovieList = response.data.results.slice(0, 12);
  //   const movieList = popularMovieList.map(
  //     movie =>
  //       (movie = {
  //         poster: movie.poster_path,
  //         title: movie.title,
  //         release_date: movie.release_date,
  //         rating: movie.vote_average,
  //         summary: movie.overview,
  //         id: movie.id
  //       })
  //   );

  //   setPopularMovies(movieList);
  // }

  async function handleListPreference() {
    const url =
      `https://api.themoviedb.org/3/movie/${selectedOption.apiString}?page=1` +
      `&api_key=${API_KEY}` +
      `&language=${apiPrefs.language}` +
      `&region=${apiPrefs.region}`;

    // const url =
    //   `https://api.themoviedb.org/3/discover/movie?page=1` +
    //   `&api_key=${API_KEY}` +
    //   `&language=${apiPrefs.language}` +
    //   `&region=${apiPrefs.region}` +
    //   `&include_adult=${apiPrefs.include_adult}` +
    //   `&include_video=${apiPrefs.include_video}` +
    //   `&with_release_type=${apiPrefs.release_types}` +
    //   `&sort_by=${selected.api_sort}` +
    //   `${selected.api_additional_criteria}`;

    const response = await axios.get(url);
    const popularMovieList = response.data.results;
    const movieList = popularMovieList.map(
      movie =>
        (movie = {
          poster: movie.poster_path,
          title: movie.title,
          release_date: movie.release_date,
          rating: movie.vote_average,
          summary: movie.overview,
          id: movie.id
        })
    );

    setPopularMovies(movieList);
  }

  function handleOptionChange(selected) {
    setSelectedOption(selected);
    handleListPreference();
  }

  return (
    <div className="Home">
      <Container fluid>
        <Row>
          <h1>Welcome To Movies Unlimited</h1>
        </Row>
        <Row>
          <Col lg={3}>
            <Select
              isClearable={selectPrefs.isClearable}
              isSearchable={selectPrefs.isSearchable}
              options={movieDisplayOptions}
              defaultValue={movieDisplayOptions[0]}
              onChange={handleOptionChange}
            />
          </Col>
        </Row>
        <Row>
          {popularMovies.map((movie, index) => (
            <MovieContainer key={index} index={index} movie={movie} />
          ))}
        </Row>
      </Container>
    </div>
  );
}
