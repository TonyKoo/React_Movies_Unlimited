// API Settings and Functions
export const API_KEY = "86b812c9fc40b9c4ba12659bf6feb82a";

export const apiPrefs = {
  language: "en-US",
  region: "US",
  include_adult: false,
  include_video: false,
  default_sort_option: {
    value: "vote_average.desc",
    label: "Sort: Rating (High to Low)",
  },
  discover_genre_andor: ",", // , => AND | => OR
  min_vote_count: 5,
};

export function createApiUrl(
  apiSearchType = homePageDisplayOptions[0].value,
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

export function createSearchApiUrl(searchTerm, page = 1) {
  return (
    `https://api.themoviedb.org/3/search/movie?` +
    `api_key=${API_KEY}` +
    `&language=${apiPrefs.language}` +
    `&region=${apiPrefs.region}` +
    `&page=${page}` +
    `&query=${searchTerm}`
  );
}

export function getGenreApiUrl() {
  return (
    `https://api.themoviedb.org/3/genre/movie/list?` +
    `api_key=${API_KEY}` +
    `&language=${apiPrefs.language}`
  );
}

export function getDiscoverApiUrl(
  discover_sort_option = apiPrefs.default_sort_option,
  page = 1,
  genresSelected = [],
  searchYear = 0
) {
  var baseUrl =
    `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}` +
    `&language=${apiPrefs.language}&region=${apiPrefs.region}&sort_by=${discover_sort_option.value}` +
    `&include_adult=${apiPrefs.include_adult}&include_video=${apiPrefs.include_video}` +
    `&page=${page}&vote_count.gte=${apiPrefs.min_vote_count}`;

  var constructedUrl = baseUrl;

  if (searchYear > 0) {
    constructedUrl += `&primary_release_year=${searchYear}`;
  }

  if (genresSelected != null && genresSelected.length > 0) {
    constructedUrl += `&with_genres=`;
    genresSelected.map(
      (genres) =>
        (constructedUrl += genres.value + `${apiPrefs.discover_genre_andor}`)
    );
  }
  return constructedUrl;
}

export function getMovieDetailUrl(movie_id) {
  return (
    `https://api.themoviedb.org/3/movie/${movie_id}?` +
    `api_key=${API_KEY}&language=${apiPrefs.language}`
  );
}

// Home Page Settings
export const selectionBoxPrefs = {
  isClearable: false,
  isSearchable: false,
};

export const homePageDisplayOptions = [
  {
    value: "popular",
    label: "Popular Movies",
  },
  {
    value: "top_rated",
    label: "Top Rated Movies",
  },
  {
    value: "upcoming",
    label: "Upcoming Movies",
  },
  {
    value: "now_playing",
    label: "Now Playing",
  },
];

export const selectionMaxResults = 12;

// Movie Summary Settings
export const movieSummary = {
  truncateLines: 3,
  trimWhiteSpace: true,
  ellipsis: "...",
};

// Discover Sort
export const discoverSortOptions = [
  { value: "vote_average.desc", label: "Sort: Rating (High to Low)" },
  { value: "vote_average.asc", label: "Sort: Rating (Low to High)" },
  {
    value: "primary_release_date.desc",
    label: "Sort: Release Date (Newest First)",
  },
  {
    value: "primary_release_date.asc",
    label: "Sort: Release Date (Oldest First)",
  },
  { value: "original_title.asc", label: "Sort: Title (A to Z)" },
  { value: "original_title.desc", label: "Sort: Title (Z to A)" },
];

// Movie Rating Options
export const ratingSelectOptions = [
  { value: 0, label: "None" },
  { value: 1, label: "1 (Terrible)" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5 (Good)" },
  { value: 6, label: "6" },
  { value: 7, label: "7" },
  { value: 8, label: "8" },
  { value: 9, label: "9" },
  { value: 10, label: "10 (Awesome)" },
];
