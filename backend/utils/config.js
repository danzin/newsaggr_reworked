require('dotenv').config();

const { PORT } = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;

const ROLES = {
  Admin: 5111,
  User: 5110,
};

module.exports = { PORT, MONGODB_URI, ROLES };
