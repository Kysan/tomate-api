const { Request, Response } = require("express");
const User = require("../models/User");

/**
 * @param {Request} req 
 * @param {Response} res 
 */

const getAllUsers = async (req, res) => {
    let users = await User.find({}).populate("tasks").select("_id username tasks")

    users = users.map(user => {
        const totalTime = user.tasks.reduce((acc, next) => acc + next.duration, 0)
        return { ...user.toObject(), totalTime }
    })
    res.json(users);
};

module.exports = getAllUsers
