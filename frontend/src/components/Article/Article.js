import React, { useState, useEffect } from 'react';
import './article.css';

const Article = ({ article }) => {
  const [datastring, setDatastring] = useState('');
  const date = new Date(article.date);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const articleDate = date.toLocaleDateString('en-US', options);

  useEffect(() => {
    const convertImageToDataURI = () => {
      if (article.img.data) {
        const rawImageData = article.img.data;
        const byteArray = rawImageData.toString().split(',').map(Number);
        const uint8Array = new Uint8Array(byteArray);

        const blob = new Blob([uint8Array], { type: 'image/jpeg' });

        const reader = new FileReader();
        reader.onload = function (event) {
          const dataURI = event.target.result;
          setDatastring(dataURI);
        };
        reader.readAsDataURL(blob);
      } else {
        setDatastring(`data:image/jpeg;base64,${article.img}`);
      }
    };

    convertImageToDataURI();
  }, [article.img]);

  return (
    <>
      <div className="article-card">
        <div className="article-card__header">
          <img
            src={datastring}
            alt=""
            className="article-card__img rounded-image"
          />
        </div>
        <div className="article-card__body">
          <span className={`tag ` + `tag` + `-` + article.category}>
            {article.category}
          </span>
          <div className="article-card__title">
            <h4>{article.title}</h4>
          </div>

          <div className="article-card__content">
            <p>{article.content}</p>
          </div>
          <div className="article-card__date">{articleDate}</div>
        </div>
        <div className="article-card__footer">
          <div className="article-card__footer-source">
            By: {article.source}
          </div>
          <div className="article-card__footer-full">
            <p className="sm-info-p">
              <a href={article.url}>Read full article</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Article;
