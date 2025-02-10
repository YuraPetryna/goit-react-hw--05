import { useState } from "react";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim() === "") return;
    onSubmit(query);
    setQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};

export default SearchBar;
