import axios from "axios";

const API_KEY = "79260ba6336773f1d62757d40671ff4a";
const BASE_URL = "https://api.themoviedb.org/3";

export const fetchTrendingMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMoviesByQuery = async (query) => {
  const response = await axios.get(
    `${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`
  );
  return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
  const response = await axios.get(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  return response.data;
};
