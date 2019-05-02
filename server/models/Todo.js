const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const todoSchema = new Schema({
  goal: { type: String, required: true },
  completed: { type: Boolean, default: false }
});

const Todo = module.exports = mongoose.model('Todo', todoSchema);

module.exports.findTodo = (command, page, callback) => {
  Todo.find(command, callback) 
    .skip((page-1)*5)
    .limit(5)
    .sort({_id: -1});
}

module.exports.countTodos = (command, callback) => {
  Todo.countDocuments(command, callback);
}

module.exports.addTodo = (newTodo, callback) => {
  newTodo.save(callback);
}

module.exports.updateTodo = (id, updatedTodo, callback) => {
  Todo.updateOne(id, updatedTodo, callback);
}

module.exports.deleteTodo = (id, callback) => {
  Todo.findById(id, callback)
    .then(todo => todo.remove());
}