import React, { createContext, useEffect, useState } from 'react';
import { useInfiniteQuery } from 'react-query';
import { getPostsPageArticles, searchArticles } from '../services/blogsapi';

const ArticlesContext = createContext();

export const ArticlesProvider = ({ children }) => {
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState('');
  const [lang, setLang] = useState('en');
  useEffect(() => {
    console.log(category, lang);
  }, [category, lang]);
  // Use the useInfiniteQuery hook to fetch articles for infinite scroll
  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    status,
    error,
    remove,
    refetch,
  } = useInfiniteQuery(
    'articles',
    ({ pageParam }) => getPostsPageArticles(category, pageParam, lang),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
      enabled: false, // Disable initial fetch
    },
  );

  // Use the useInfiniteQuery hook to fetch search results
  const {
    fetchNextPage: fetchSearchResults,
    hasNextPage: hasMoreSearchResults,
    isFetchingNextPage: isFetchingSearchResults,
    data: searchResults,
    status: searchStatus,
    error: searchError,
    remove: removeSearchResults,
    refetch: refetchSearchResults,
  } = useInfiniteQuery(
    'search',
    ({ pageParam = 1 }) => searchArticles(search, pageParam),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
      enabled: false, // Disable initial fetch
    },
  );

  useEffect(() => {
    remove(); // Reset query
    refetch(); // Trigger refetching of articles
    removeSearchResults();
    setSearch('');
  }, [category, refetch, remove, removeSearchResults, lang]);

  useEffect(() => {
    if (search !== '') {
      console.log('search key is: ' + search);
      remove(); // Reset query
      removeSearchResults();
      refetchSearchResults(); // Fetch search results when search query changes
    }
  }, [search, refetchSearchResults, removeSearchResults, remove]);

  return (
    <ArticlesContext.Provider
      value={{
        category,
        setCategory,
        search,
        setSearch,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        data,
        status,
        error,
        fetchSearchResults,
        hasMoreSearchResults,
        isFetchingSearchResults,
        searchResults,
        searchStatus,
        searchError,
        lang,
        setLang,
      }}
    >
      {children}
    </ArticlesContext.Provider>
  );
};
export default ArticlesContext;
