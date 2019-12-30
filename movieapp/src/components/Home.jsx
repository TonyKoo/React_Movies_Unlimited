import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [popularMovies, setPopularMovies] = useState([]);
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchPopularMovies();
  }, [popularMovies]);

  async function fetchPopularMovies() {
    const url =
      "https://api.themoviedb.org/3/discover/movie?api_key=86b812c9fc40b9c4ba12659bf6feb82a&language=en-US&sort_by=popularity.desc";
    const response = await axios.get(url);
    const popularMovieList = response.data.results.slice(0, 12);
    const movieList = popularMovieList.map(
      (movie, index) =>
        (movie = {
          title: movie.title,
          id: movie.id
        })
    );

    setPopularMovies(movieList);
  }

  return (
    <div className="Home">
      <h1>Welcome To Movies Unlimited</h1>
      <p>The Alternative To IMDB</p>

      {popularMovies.map((popularMovie, index) => (
        <p>
          {index + 1}) {popularMovie.title}
        </p>
      ))}
    </div>
  );
}
