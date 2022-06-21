const todo_db = {};

function makeid(length) {
    var result = "";
    var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const addTodo = function (todo) {
    id = makeid(8);
    todo.id = id;
    todo_db[id] = todo;
    console.log(todo_db);
    return todo;
};

const getTodo = function (id) {
    return todo_db[id];
};

const getTodos = function () {
    return todo_db;
};

const setTodo = function (id, todo) {
    todo_db[id] = todo;
    return todo;
};

// patchTodo - update a todo
const patchTodo = function (id, todoData) {
    // loop over the data and set each individual item
    for (const key in todoData) {
        todo_db[id][key] = todoData[key];
    }

    // Object.keys(todoData).forEach(function (key) {
    //   todo_db[id][key] = todoData[key];
    // });

    // pull the new data
    const todo = todo_db[id];
    return todo;
};

const deleteTodo = function (id) {
    const todo = todo_db[id];
    delete todo_db[id];
    return todo;
};

module.exports = {
    addTodo: addTodo,
    getTodo: getTodo,
    getTodos: getTodos,
    setTodo: setTodo,
    patchTodo: patchTodo,
    deleteTodo: deleteTodo,
};