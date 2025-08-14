"use client";

import { useState, useEffect } from "react";
import { useDebounce } from "use-debounce";

export default function Home() {
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 500);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      return;
    }

    async function fetchAddresses() {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          debouncedQuery
        )}`
      );
      const data = await res.json();
      setResults(data);
    }

    fetchAddresses();
  }, [debouncedQuery]);

  return (
    <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Address Search Demo</h1>
      <input
        type="text"
        placeholder="Type an address..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={{
          padding: "0.5rem",
          width: "300px",
          border: "1px solid #ccc",
          borderRadius: "4px",
        }}
      />

      <ul style={{ marginTop: "1rem", padding: 0, listStyle: "none" }}>
        {results.map((item, idx) => (
          <li
            key={idx}
            style={{
              padding: "0.5rem",
              borderBottom: "1px solid #eee",
              cursor: "pointer",
            }}
            onClick={() => alert(item.display_name)}
          >
            {item.display_name}
          </li>
        ))}
      </ul>
    </main>
  );
}
