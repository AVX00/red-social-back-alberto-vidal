const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const authToken = req.header("Authorization");
  if (!authToken) {
    const error = new Error("missing token");
    error.code = 401;
    return next(error);
  }
  const token = authToken.replace("Bearer ", "");
  try {
    jwt.verify(token, process.env.SECRET);
    return next();
  } catch (error) {
    error.code = 500;
    return next(error);
  }
};

module.exports = auth;
