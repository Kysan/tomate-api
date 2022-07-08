const mongoose = require("mongoose");



const user = mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: "tasks" }],
});



module.exports = mongoose.model("users", user);
