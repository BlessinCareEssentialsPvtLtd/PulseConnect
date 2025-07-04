// src/pages/HealthNews.jsx

import { useEffect, useState } from "react";
import axios from "axios";


export default function HealthNews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "pub_ad0bd37708dd4480b10a49b2b8801a08"; // Replace with your actual NewsData.io API key

  useEffect(() => {
    axios
      .get(`https://newsdata.io/api/1/news?apikey=${API_KEY}&country=in&category=health&language=en`)
      .then((res) => {
        setNews(res.data.results || []);
      })
      .catch((err) => {
        console.error("News fetch error:", err);
        setError("Failed to fetch news.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="p-4">Loading health news...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Health News</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {news.map((item, idx) => (
          <a
            key={idx}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-4 rounded shadow hover:shadow-lg transition duration-300 border border-gray-200"
          >
            <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{item.description?.slice(0, 100)}...</p>
            <p className="text-xs text-gray-400">
              Source: {item.source_id} • {new Date(item.pubDate).toLocaleDateString()}
            </p>
          </a>
        ))}
      </div>
    </div>
  );
}
