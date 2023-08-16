require('dotenv').config();
const axios = require('axios');
const { NewsModel, newTestCollection } = require('../models/news');
const { downloadImageBuffer } = require('../utils/getImageBuffer');
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(process.env.NEWSAPI_KEY);
const { daysAgo, today, beautifulDate } = require('../utils/dateUtils');
// const { kaldataRSS } = require('../utils/rssParserss/kaldataRSS');
// const { dnesbgRSS } = require('../utils/rssParsers/dnesbgRSS');
const { gameBG } = require('../utils/rssParsers/gamebgRSS');
const bgloader = async (req, res) => {
  // dnesbgRSS();
  // kaldataRSS();
  gameBG();
  res.status(200).end();
};

/* Loads articles in database.
   Used in router and cronjob */
const loader = async (q) => {
  var c = 0;
  var queries;
  console.log('Loading articles');

  q
    ? (queries = q.split(','))
    : (queries = ['gaming', 'business', 'technology', 'finance']);
  console.log('queries: ', queries);
  for (const query of queries) {
    console.log('current query for newsapi q is: ', query);
    const response = await newsapi.v2.everything({
      q: query,
      language: 'en',
      pageSize: 100,
      sortBy: '-publishedAt',
      from: daysAgo(10).beautifulDate,
      to: today().beautifulDate,
    });

    const articles = response.articles;

    for (const article of articles) {
      const filter = { url: article.url };
      const existingArticle = await NewsModel.findOne(filter);
      if (!existingArticle) {
        try {
          // Download the image buffer using the module function
          const imgBuffer = await downloadImageBuffer(article.urlToImage);
          console.log(imgBuffer); // Verify the image buffer

          const update = {
            $setOnInsert: {
              title: article.title,
              description: article.description,
              source: article.source.name,
              author: article.author,
              img: imgBuffer,
              imgUrl: article.urlToImage,
              content: article.content,
              category: query,
              date: new Date(article.publishedAt),
              language: article.language,
            },
          };
          const options = { upsert: true };

          await NewsModel.updateOne(filter, update, options);
          c++;
        } catch (error) {
          console.error('Error handling article:', article.url);
          continue; // Skip this article if there was an error with the image download
        }
      }
    }
  }
  console.log(c, ' articles loaded successfully');
};

/** Load articles in database */
const loadArticles = async (req, res) => {
  const { q } = req.query;
  loader(q);
  res.sendStatus(200).end();
};

/** Returns items by category if it's specified in the request
    and all items if no category is specified
*/
const getFeed = async (req, res) => {
  const { q, page, lang } = req.query;
  console.log(lang);
  const limit = 6;
  const skip = (page - 1) * limit;
  console.log(q);
  const categories = q ? q.split(',') : undefined;
  const query = categories
    ? {
        category: { $in: categories },
      }
    : {};

  console.log(query);

  const response =
    lang === 'bg'
      ? await newTestCollection.find(query)
      : await NewsModel.find(query)
          .sort({ date: -1 })
          .skip(skip)
          .limit(limit)
          .lean();

  res.json(response);
};

// Get articles based on keywords
const searchKeywords = async (req, res) => {
  const { q, page } = req.query;
  const limit = 6;
  const skip = (page - 1) * limit;

  const query = {
    $text: { $search: q },
  };

  const response = await NewsModel.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .lean();
  res.json(response);
};

/** Delete all */
const removeAll = async (req, res) => {
  const response = await NewsModel.deleteMany({});
  res.status(204).end();
};

/** Get all  */
const getAll = async (req, res) => {
  const articles = await NewsModel.find({});

  res.json(articles);
};

module.exports = {
  loader,
  loadArticles,
  getFeed,
  searchKeywords,
  removeAll,
  getAll,
  bgloader,
};
