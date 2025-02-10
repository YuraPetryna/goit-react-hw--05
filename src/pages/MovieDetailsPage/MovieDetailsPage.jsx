import { useEffect, useState, Suspense, lazy } from "react";
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

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={backLink} className={styles.goBack}>
        ← Go back
      </Link>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <h3>Genres:</h3>
          <p>{movie.genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>

      <h2>Additional Information</h2>
      <ul>
        <li>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </li>
      </ul>

      <Suspense fallback={<p>Loading additional content...</p>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
