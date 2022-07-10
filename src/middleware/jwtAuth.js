
const jwt = require("jsonwebtoken");
const config = require("../config.json")

const jwtAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({ error: "not token provided" });
    }

    const { _id: userId } = jwt.verify(token, config.jwtSecret);

    req.userId = userId
    next()
  } catch {
    console.error("bad jwt")
    res.send("bad jwt")
  }
};

module.exports = jwtAuth;
