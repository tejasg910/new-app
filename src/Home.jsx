import React, { useState, useEffect, lazy, Suspense } from "react";
import { FaNewspaper, FaExternalLinkAlt } from "react-icons/fa";

const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const LazyNewsCard = lazy(() => import("./NewsCard"));

const ErrorFallback = ({ error }) => (
  <div
    role="alert"
    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
  >
    <strong className="font-bold">Oops!</strong>
    <span className="block sm:inline">
      {" "}
      Something went wrong: {error.message}
    </span>
  </div>
);

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
  </div>
);

const NewsDashboard = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `${API_ENDPOINT}?category=general&apikey=${API_KEY}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setNews(data.articles);
      } catch (e) {
        console.error("Error fetching news:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorFallback error={{ message: error }} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background-light to-background-dark p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center">
        <FaNewspaper className="mr-4" aria-hidden="true" /> Top Headlines
        ACONEWS
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <Suspense fallback={<LoadingSpinner />}>
          {news.map((article, index) => (
            <LazyNewsCard key={index} article={article} />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default NewsDashboard;
