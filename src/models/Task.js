const mongoose = require("mongoose");

const task = mongoose.Schema({
    name: { type: String, required: true },
    timestamp: { type: Number, required: true },
    duration: { type: Number, required: true },
    done: { type: Boolean, required: true }
});



module.exports = mongoose.model("tasks", task);
