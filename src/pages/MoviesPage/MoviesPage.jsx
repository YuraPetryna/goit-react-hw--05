import { useState } from "react";
import { fetchMoviesByQuery } from "../../services/api";
import MovieList from "../../components/MovieList/MovieList";
import styles from "./MoviesPage.module.css";
import { Toaster, toast } from "react-hot-toast";
const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const results = await fetchMoviesByQuery(query);

      if (results.length === 0) {
        toast.error("Фільми не знайдено. Спробуйте інший запит.");
      }

      setMovies(results);
    } catch (error) {
      toast.error("Сталася помилка при пошуку.");
    }
  };

  return (
    <div className={styles.page}>
      <Toaster position="top-right" reverseOrder={false} />
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
