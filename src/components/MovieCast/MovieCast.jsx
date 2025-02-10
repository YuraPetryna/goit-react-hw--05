import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieCast.module.css";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "79260ba6336773f1d62757d40671ff4a";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => setCast(response.data.cast))
      .catch((error) => console.error("Error fetching cast:", error));
  }, [movieId]);

  return (
    <ul className={styles.castList}>
      {cast.map((actor) => (
        <li key={actor.id} className={styles.castItem}>
          <img
            src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
            alt={actor.name}
          />
          <p>{actor.name}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieCast;
