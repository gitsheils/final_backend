const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const { JWT_SECRET = "dev-key" } = process.env;

  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    const error = new Error("Authorization is required");
    error.statusCode = 401;
    return next(error);
  }

  const token = authorization.replace("Bearer ", "");
  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new Error("Authorization is required");
    error.statusCode = 401;
    return next(error);
  }
  req.user = payload;
  next();
};
