import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "./MovieReviews.module.css";

const API_URL = "https://api.themoviedb.org/3/movie/";
const API_KEY = "79260ba6336773f1d62757d40671ff4a";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}${movieId}/reviews?api_key=${API_KEY}`)
      .then((response) => setReviews(response.data.results))
      .catch((error) => console.error("Error fetching reviews:", error));
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      {reviews.length ? (
        <ul>
          {reviews.map((review) => (
            <li key={review.id} className={styles.reviewItem}>
              <h4>{review.author}</h4>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No reviews available</p>
      )}
    </div>
  );
};

export default MovieReviews;
