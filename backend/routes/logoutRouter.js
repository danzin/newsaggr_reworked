const logoutRouter = require('express').Router();

const { handleLogout } = require('../controllers/logoutController');

logoutRouter.get('/', handleLogout);

module.exports = logoutRouter;
