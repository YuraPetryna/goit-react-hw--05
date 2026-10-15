import axios from "axios";

const API_KEY = "79260ba6336773f1d62757d40671ff4a";
const BASE_URL = "https://api.themoviedb.org/3";

// Fetches the same list in English and Ukrainian and attaches the Ukrainian
// title as `title_uk` (only when it differs from the original title).
const withUkrainianTitles = async (path, params = "") => {
  const url = (lang) =>
    `${BASE_URL}${path}?${params}api_key=${API_KEY}&language=${lang}`;
  const [en, uk] = await Promise.all([
    axios.get(url("en-US")),
    axios.get(url("uk-UA")).catch(() => null),
  ]);
  const ukTitles = new Map(
    (uk?.data.results ?? []).map(({ id, title }) => [id, title])
  );
  return en.data.results.map((movie) => {
    const titleUk = ukTitles.get(movie.id);
    return { ...movie, title_uk: titleUk !== movie.title ? titleUk : "" };
  });
};

export const fetchTrendingMovies = () =>
  withUkrainianTitles("/trending/movie/day");

export const fetchMoviesByQuery = (query) =>
  withUkrainianTitles("/search/movie", `query=${encodeURIComponent(query)}&`);

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};
