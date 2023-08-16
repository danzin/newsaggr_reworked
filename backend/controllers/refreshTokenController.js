const User = require('../models/user');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  const user = await User.findOne({ refreshToken });
  if (!user) return response.sendStatus(403); //forbidden

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || user.id === decoded.id) return res.sendStatus(403); //forbidden

    const accessToken = jwt.sign(
      {
        userInfo: {
          id: decoded.id,
          roles: decoded.roles,
        },
      },

      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '3h' },
    );
    res.json({ accessToken });
  });
};

module.exports = { handleRefreshToken };
