const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    name: { type: String, default: "" },
    description: { type: String, default: "" },
    done: { type: Boolean, default: false },
    deadline: { type: Date, default: new Date() },
    tags: { type: [String], default: [] },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;