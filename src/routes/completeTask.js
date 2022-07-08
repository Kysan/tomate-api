const { Request, Response } = require("express");
const Task = require("../models/Task");
const User = require("../models/User");

/**
 * @param {Request} req 
 * @param {Response} res 
 */

const completeTask = async (req, res) => {
    const { name,
        timestamp,
        duration,
        done
    } = req.body;


    const user = await User.findById(req.userId)

    // * we create the task
    const task = await Task.create({
        name,
        timestamp,
        duration,
        done
    })

    await task.save()

    // * and add it to the tasks list of the user
    user.tasks.push(task._id)
    await user.save()

    res.json({ ...task.toObject() });
};

module.exports = completeTask
