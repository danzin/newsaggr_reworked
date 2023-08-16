const User = require('../models/user');

const handleLogout = async (req, res) => {
  //TODO: Delete AccessToken on client when logout is clicked
  const cookies = req.cookies;

  //Check if cookie exists
  if (!cookies?.jwt) return res.sendStatus(204); //No content in cookies.jwt
  const refreshToken = cookies.jwt;

  //Check for the cookie in database
  const user = await User.findOne({ refreshToken });
  if (!user) {
    //If cookie is not in the dabase but exists, remove it
    res.clearCookie('jwt', { httpOnly: true });
    return res.sendStatus(204); //Success, no content
  }

  user.refreshToken = '';
  await user.save();
  res.clearCookie('jwt', { httpOnly: true }); //TODO: add secure: true in prod build
  res.sendStatus(204);
};

module.exports = { handleLogout };
