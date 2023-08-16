const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(400).json({ message: 'Missing username or password' });
  const user = await User.findOne({ username });
  console.log(user);
  if (!user) return res.sendStatus(403); //forbidden
  const roles = user.roles;
  const id = user.id;
  const categories = user.categories;
  //check password
  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash);

  if (passwordCorrect) {
    const accessToken = jwt.sign(
      {
        userInfo: {
          id: user.id,
          roles: user.roles,
        },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '3h' },
    );

    const refreshToken = jwt.sign(
      { username: user.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '2d' },
    );

    user.refreshToken = refreshToken;
    await user.save();

    //httpOnly cookie with maxAge of 1 day
    res.cookie('jwt', refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    //store accessToken in client memory
    res.json({ roles, accessToken });
    // response.end();
  } else {
    return res.status(401).json({
      error: 'invalid username or password',
    });
  }
};

module.exports = { loginUser };
