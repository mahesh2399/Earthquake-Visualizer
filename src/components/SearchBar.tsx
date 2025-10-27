import { useEffect, useState } from "react";
import "../styles/searchbar.css";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      onSearch(query.trim());
    }, 600);
    return () => clearTimeout(id);
  }, [query, onSearch]);

  return (
    <div className="animated-search">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search place (city / region / country)..."
      />
      <span className="icon">🔍</span>
      {/* Clear button */}
      {query && (
        <button
          className="clear-btn"
          onClick={() => {
            setQuery("");
            onSearch("");
          }}
          aria-label="Clear"
        >
          ✖
        </button>
      )}
    </div>
  );
}
