const userSRouter = require('express').Router();
const {
  getUserFeed,
  updateUserCategories,
} = require('../controllers/userController');

userSRouter.get('/feed', getUserFeed);
userSRouter.put('/catupdate', updateUserCategories);

module.exports = { userSRouter };
