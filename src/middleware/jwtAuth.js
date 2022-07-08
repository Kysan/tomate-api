
const jwt = require("jsonwebtoken");
const config = require("../config.json")

const jwtAuth = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.json({ error: "not token provided" });
  }

  const { _id: userId } = jwt.verify(token, config.jwtSecret);

  req.userId = userId
  next()
};

module.exports = jwtAuth;
