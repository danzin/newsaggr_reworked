const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roles: {
    User: {
      type: Number,
      defalt: 5110,
    },
    Admin: Number,
  },
  passwordHash: String,
  categories: Array,
  refreshToken: String,
});
// use uniquevalidator
userSchema.plugin(uniqueValidator);

/** Function transforms the returned object from database
 *
 * @param {object} returnedObject
 * @return modified returnedObject; __v removed, id instead of _id
 * excludes passwordHash
 */
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
