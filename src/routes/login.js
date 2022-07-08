const { Request, Response } = require("express")
const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken")
const config = require("./../config.json")

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username })

  if (!user) {
    return res.json({ error: "invalid credentials" });
  }

  const validCredential = bcrypt.compareSync(password, user.password);

  if (!validCredential) {
    return res.json({ error: "invalid credentials" });
  }
  res.json({ token: jwt.sign({ _id: user._id }, config.jwtSecret) });
};

module.exports = login
