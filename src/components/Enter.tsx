import React, { useState } from "react";
const { ipcRenderer } = window.require("electron");

export default function Enter() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQuerySubmit = () => {
    ipcRenderer.send("query", query);

    ipcRenderer.on("query-results", (event, results) => {
      setResults(results);
    });
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleQueryChange} />
      <button onClick={handleQuerySubmit}>Submit</button>
      <ul>
        {results.map((result: any, index: number) => (
          <li key={index}>{result.first_name}</li>
        ))}
      </ul>
    </div>
  );
}
