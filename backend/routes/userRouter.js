const userRouter = require('express').Router();
const {
  createUser,
  removeUser,
  getUser,
  getAll,
  getUserFeed,
} = require('../controllers/userController');

userRouter.post('/register', createUser);

userRouter.get('/feed', getUserFeed);

userRouter.delete('/:id', removeUser);

userRouter.get('/:id', getUser);

userRouter.get('/', getAll);

module.exports = userRouter;
