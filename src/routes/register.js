const { Request, Response } = require("express");
const User = require("../models/User");
const config = require("./../config.json")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

/**
 * @param {Request} req 
 * @param {Response} res 
 */
const register = async (req, res) => {
  let { username, password } = req.body;
  username = username.trim()
  const alreadyExist = await User.findOne({ username })

  if (alreadyExist) {
    return res.json({ error: "username already taken" })
  }

  const user = await User.create({
    username, password: bcrypt.hashSync(password, bcrypt.genSaltSync())
  })

  await user.save()




  res.json({ token: jwt.sign({ _id: user._id }, config.jwtSecret) });
};

module.exports = register
