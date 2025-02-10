import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

const NotFoundPage = () => {
  return (
    <div className={styles.container}>
      <h1>404 - Page Not Found</h1>
      <Link to="/" className={styles.homeLink}>
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
