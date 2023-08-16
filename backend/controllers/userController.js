const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { NewsModel, newTestCollection } = require('../models/news');

const createUser = async (req, res) => {
  // destructure username and password fields from request's body
  const { username, email, password } = req.body;

  if (password.length < 8 || !username || !email) {
    res.status(400).json({
      error: 'All fields are required.',
    });
  }
  // Check if username or email already exists
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    if (existingUser.username === username) {
      return res.status(409).json({ error: 'Username already in use.' });
    } else if (existingUser.email === email) {
      return res.status(409).json({ error: 'Email already in use.' });
    }
  }
  let roles = [5110];

  // password encryption
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  // create the new user with password hash
  const user = await User.create({
    username,
    email,
    passwordHash,
  });

  // store the resolved promise

  res.status(201).json(user);
};

//get news articles from user's categories
const getUserFeed = async (req, res) => {
  const { page } = req.query;
  const categories = req.user.categories;
  const limit = 6;
  const skip = (page - 1) * limit;
  console.log(categories);
  console.log('-------------');
  const query = categories
    ? {
        category: { $in: categories },
      }
    : {};

  //get all articles with category matching the user catogories
  const response = await NewsModel.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit)
    .lean();

  res.json(response);
};

//remove user by id
const removeUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    res.status(404).json({ error: 'User not found' });
  }
  res.status(204).send();
};

//get specific user by id
const getUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log('-----------', user);
  user ? res.json(user) : res.status(404).send();
};

//get all users
const getAll = async (req, res) => {
  const users = await User.find({});
  res.status(201).json(users);
};

//update user categories
const updateUserCategories = async (req, res) => {
  const { categories } = req.body;
  const user = req.user;
  const newCategories = categories.split(',');
  user.categories = newCategories;

  const updatedUser = await user.save();

  res.status(200).json(updatedUser);
};

module.exports = {
  createUser,
  removeUser,
  getUser,
  getAll,
  updateUserCategories,
  getUserFeed,
};
