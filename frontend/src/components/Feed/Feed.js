import React, { useEffect } from 'react';
import ArticleList from '../ArticleList/ArticleList';
import { useArticles } from '../../hooks/useArticles';
import { useInView } from 'react-intersection-observer';
import useAuth from '../../hooks/useAuth';
import './feed.css';

const Feed = () => {
  const { auth } = useAuth();
  const { ref, inView } = useInView();

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    data,
    searchResults,
    fetchSearchResults,
    hasMoreSearchResults,
  } = useArticles();
  var content;

  useEffect(() => {
    if (inView) {
      hasNextPage && fetchNextPage();
      hasMoreSearchResults && fetchSearchResults();
    }
  }, [
    inView,
    fetchNextPage,
    hasNextPage,
    hasMoreSearchResults,
    fetchSearchResults,
  ]);

  data
    ? (content = data?.pages.map((pg) => {
        return pg.map((post, i) => {
          if (pg.length === i + 1) {
            return <ArticleList ref={ref} article={post} key={post.url} />;
          }
          return <ArticleList article={post} key={post.url} />;
        });
      }))
    : (content = searchResults?.pages.map((pg) => {
        return pg.map((post, i) => {
          if (pg.length === i + 1) {
            return <ArticleList ref={ref} article={post} key={post.url} />;
          }
          return <ArticleList article={post} key={post.url} />;
        });
      }));

  return (
    <div className="feed-container">
      {content}
      {isFetchingNextPage && <p>Loading more posts...</p>}
    </div>
  );
};

export default Feed;
