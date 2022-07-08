const { Request, Response } = require("express");
const User = require("../models/User");

/**
 * @param {Request} req 
 * @param {Response} res 
 */

const getProfile = async (req, res) => {
  const user = await User.findById(req.userId).populate("tasks").select("_id username tasks")
  const totalTime = user.tasks.reduce((acc, next) => acc + next.duration, 0)
  res.json({ ...user.toObject(), totalTime });
};

module.exports = getProfile
