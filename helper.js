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

module.exports = {
    setupTodo,
};