import React, { useState } from "react";

function App() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:4000/api/shorten", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();
      setShortUrl(data.shortUrl);
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>🔗 URL Shortener</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your long URL"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
          style={{ width: "300px", padding: "8px" }}
        />
        <button type="submit" style={{ marginLeft: "10px", padding: "8px" }}>
          Shorten
        </button>
      </form>
      {shortUrl && (
        <div style={{ marginTop: "20px" }}>
          <strong>Short URL:</strong>{" "}
          <a href={shortUrl} target="_blank" rel="noopener noreferrer">
            {shortUrl}
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
