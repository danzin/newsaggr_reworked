import { useContext } from 'react';
import ArticlesContext from '../context/ArticlesContext';

export const useArticles = () => {
  const context = useContext(ArticlesContext);
  if (!context) {
    throw new Error('context is undefined');
  }

  return context;
};

export default useArticles;
