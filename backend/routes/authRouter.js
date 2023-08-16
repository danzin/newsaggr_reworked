const authRouter = require('express').Router();

const { loginUser } = require('../controllers/authController');

authRouter.post('/', loginUser);

module.exports = authRouter;
