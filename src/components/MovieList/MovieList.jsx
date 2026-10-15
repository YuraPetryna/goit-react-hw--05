import { Link, useLocation } from "react-router-dom";
import styles from "./MovieList.module.css";
import noImage from "../../../public/no-image.svg";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const StarIcon = () => (
  <svg className={styles.star} viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={styles.list}>
      {movies.map(({ id, title, poster_path, vote_average }) => (
        <li key={id} className={styles.item}>
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <div className={styles.posterWrap}>
              <img
                src={poster_path ? `${IMAGE_BASE_URL}${poster_path}` : noImage}
                alt={title}
                className={styles.poster}
                loading="lazy"
              />
              {vote_average > 0 && (
                <span
                  className={styles.rating}
                  title={`Rating ${vote_average.toFixed(1)} / 10`}
                >
                  <StarIcon />
                  {vote_average.toFixed(1)}
                </span>
              )}
            </div>
            <p className={styles.title}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
