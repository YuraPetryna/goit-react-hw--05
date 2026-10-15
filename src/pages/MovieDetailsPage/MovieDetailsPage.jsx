import { useEffect, useState, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import styles from "./MovieDetailsPage.module.css";

// const MovieCast = lazy(() => import("../../components/MovieCast/MovieCast"));
// const MovieReviews = lazy(() =>
//   import("../../components/MovieReviews/MovieReviews")
// );

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "79260ba6336773f1d62757d40671ff4a";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from || "/movies";

  useEffect(() => {
    axios
      .get(`${API_URL}${movieId}?api_key=${API_KEY}`)
      .then((response) => setMovie(response.data))
      .catch((error) => console.error("Error fetching movie:", error));
  }, [movieId]);

  if (!movie) return <p className={styles.container}>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.goBack}>
        ← Go back
      </Link>
      <div className={styles.content}>
        <img
          className={styles.poster}
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className={styles.info}>
          <h1>{movie.title}</h1>
          {movie.vote_average > 0 && (
            <p className={styles.rating}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              {movie.vote_average.toFixed(1)} <span>/ 10</span>
            </p>
          )}
          <p className={styles.overview}>{movie.overview}</p>
          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id} className={styles.genre}>
                {genre.name}
              </li>
            ))}
          </ul>
          <div className={styles.additional}>
            <h2>Additional information</h2>
            <ul className={styles.list}>
              <li className={styles.item}>
                <Link to="cast" state={{ from: backLink }}>
                  Cast
                </Link>
              </li>
              <li className={styles.item}>
                <Link to="reviews" state={{ from: backLink }}>
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className={styles.extra}>
        <Suspense fallback={<p>Loading additional content...</p>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
