// initiate express server
const express = require("express");
const app = express();

app.use(express.json());

// pull in helpers
const helpers = require("./helper");

// pull in memory db
const Todo = require("./persist/todo");

//call in memory.js
const mem = require("./persist/memory");

app.post("/todo", (req, res) => {
    // validate the data
    const vTodo = helpers.setupTodo(req.body);
    Todo.create(vTodo)
        .then((todo) => {
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

// set up server paths and handlers
app.get("/todo/:id", (req, res) => {
    const id = req.params.id;
    //caching
    let myCacheTodo = mem.getTodo(id);
    //find out if your cache exists if not do the todo.findbyid
    if (myCacheTodo != null) {
        res.json(myCacheTodo);
        return;
    }
    Todo.findById(id)
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ message: "not found" });
                return;
            }
            res.json(todo);
            mem.setTodo(id, todo);
            console.log(mem.getTodo(id));
            setTimeout(() => {
                mem.deleteTodo(id);
                console.log("10 seconds!.");
                console.log(mem.getTodo(id));
                console.log(todo);
            }, 10000);

            //setTimeout(deleteTodo(id), 1000);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.get("/todos", (req, res) => {
    Todo.find()
        .then((todos) => {
            res.json(todos);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.delete("/todo/:id", (req, res) => {
    const id = req.params.id;
    Todo.findByIdAndDelete(id)
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ message: "not found" });
                return;
            }
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.put("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    const vTodo = helpers.setupTodo(req.body);
    Todo.findByIdAndUpdate(id, vTodo, { returnDocument: "after" })
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ message: "not found" });
                return;
            }
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

app.patch("/todo/:id", (req, res) => {
    const id = req.params.id;
    // validate the data
    // this validation is done a bit different than the post and put
    Todo.findByIdAndUpdate(id, req.body, { returnDocument: "after" })
        .then((todo) => {
            if (todo == null) {
                res.status(404).json({ message: "not found" });
                return;
            }
            res.json(todo);
        })
        .catch((err) => {
            res.status(500).json(err);
        });
});

module.exports = app;