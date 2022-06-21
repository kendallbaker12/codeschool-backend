// initiate express server
const express = require("express");
const app = express();

app.use(express.json());

// pull in db
const persist = require("./persist");

// put in command line flags
const flags = require("flags");
flags.defineNumber("port", 3000, "Ports for the http servier to listen on");
flags.parse();

// put in env vars
const dotenv = require("dotenv");

// set up port number
const port = flags.get("port") || process.env.PORT || 3000;

// set up server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.getTodo(id);
    res.json(todo);
});

app.get("/todos", (req, res) => {
    res.json(persist.getTodos());
});

app.post("/todo", (req, res) => {
    // validate the data
    const vTodo = setupTodo(req.body);
    const todo = persist.addTodo(vTodo);
    res.json(todo);
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    const todo = persist.deleteTodo(id);
    res.json(todo);
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    const vTodo = setupTodo(req.body);
    const todo = persist.setTodo(id, vTodo);
    res.json(todo);
});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    // this validation is done a bit different than the post and put
    const todo = persist.patchTodo(id, req.body);
    res.json(todo);
});

// start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

setupTodo = function (todoData) {
    let deadline = new Date();
    let done = false;
    // check deadline and make sure its good
    if (todoData.deadline) {
        deadline = new Date(todoData.deadline);
    }
    // check done and make sure its good
    if (todoData.done) {
        done = todoData.done;
    }
    // set defaults for eveything else
    return {
        name: todoData.name || "",
        description: todoData.description || "",
        done: done,
        deadline: deadline,
    };
};