const articlesRouter = require('express').Router();
const {
  loadArticles,
  getFeed,
  searchKeywords,
  removeAll,
  getAll,
  bgloader,
} = require('../controllers/articlesController');

articlesRouter.post('/fill', loadArticles);

articlesRouter.post('/fillbg', bgloader);

articlesRouter.get('/search', searchKeywords);

articlesRouter.get('/feed', getFeed);

articlesRouter.get('/', getAll);

articlesRouter.delete('/deleteall', removeAll);

module.exports = articlesRouter;
