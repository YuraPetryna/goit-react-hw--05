import { useState } from "react";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchMoviesByQuery(query).then(setMovies);
  };

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.input}
          placeholder="Search movies..."
        />
        <button type="submit" className={styles.button}>
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
