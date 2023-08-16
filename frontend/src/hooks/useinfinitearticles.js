import { useState, useEffect } from 'react';
import { getPostsPageArticles } from '../services/blogsapi';
import { useArticlesContext } from '../context/ArticlesContext';

/**
 * Custom hook for infinite scroll in Feed.js component
 *
 * @param { Number } pageNum The page number to fetch data for
 * @returns {Object} An object containing the following properties:
 * - isLoading: A boolean indicating if data is currently being loaded
 * - isError: A boolean indicating if an error occurred while fetching data.
 * - error: The error Object, if any, that occurred during data fetching.
 * - results: An array of data fetched for the given page number.
 * - hasNextPage: A boolean indicating if there are more pages to fetch.
 */

const usePosts = (pageNum = 1) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);
  const { category } = useArticlesContext();

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});

    const controller = new AbortController();
    const { signal } = controller;
    getPostsPageArticles(category, pageNum, { signal })
      .then((data) => {
        console.log(data);
        setResults((prev) => [...prev, ...data]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({ message: e.message });
      });

    return () => controller.abort();
  }, [pageNum, category]);
  useEffect(() => {
    setResults([]);
  }, [category]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default usePosts;
