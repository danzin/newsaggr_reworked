const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('express-async-errors');
const config = require('./utils/config');
const middleware = require('./utils/middleware');
const userRouter = require('./routes/userRouter');
const articlesRouter = require('./routes/articlesRouter');
const { userSRouter } = require('./routes/userSRouter');
const authRouter = require('./routes/authRouter');
const refreshRouter = require('./routes/refreshRouter');
const cookieParser = require('cookie-parser');
const logoutRouter = require('./routes/logoutRouter');

require('./tasks/scheduler');

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});
mongoose.set('strictQuery', false);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to database: ', error.message);
  });

app.use(express.static('build'));

// Middleware
app.use(express.json());
// Middleware for cookies
app.use(cookieParser());
app.use(middleware.requestLogger);
app.use(cors());

// Routing
app.use('/api/articles', articlesRouter);
app.use('/api/user', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/refresh', refreshRouter);
app.use('/api/logout', logoutRouter);
//Protected routes for individual user
app.use(
  '/api/usersc/',
  middleware.tokenExtractor,
  middleware.userExtractor,

  userSRouter,
);
module.exports = app;
