const refreshRouter = require('express').Router();

const { handleRefreshToken } = require('../controllers/refreshTokenController');

refreshRouter.get('/', handleRefreshToken);

module.exports = refreshRouter;
