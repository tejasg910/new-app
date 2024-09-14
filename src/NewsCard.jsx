import React from 'react';
import { FaExternalLinkAlt } from 'react-icons/fa';

const NewsCard = ({ article }) => (
  <article className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300">
    <img src={article.image} alt="" className="w-full h-48 object-cover rounded-t-lg mb-4" />
    <h2 className="text-xl font-bold mb-2 text-gray-800">{article.title}</h2>
    <p className="text-gray-600 mb-4">{article.description}</p>
    <div className="flex justify-between items-center">
      <time className="text-sm text-gray-500" dateTime={article.publishedAt}>
        {new Date(article.publishedAt).toLocaleDateString()}
      </time>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center text-primary hover:text-primary-dark focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
        aria-label={`Read more about ${article.title}`}
      >
        Read More <FaExternalLinkAlt className="ml-1" aria-hidden="true" />
      </a>
    </div>
  </article>
);

export default NewsCard;