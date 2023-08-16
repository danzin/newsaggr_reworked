import React from 'react';
import './articleList.css';
import Article from '../Article/Article';
const ArticleList = React.forwardRef(({ article }, ref) => {
  const content = ref ? (
    <div className="ref" ref={ref}>
      <Article article={article} />
    </div>
  ) : (
    <div className="ref">
      <Article article={article} />
    </div>
  );
  return content;
});

export default ArticleList;
