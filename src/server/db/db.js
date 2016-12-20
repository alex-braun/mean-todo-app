var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/todos');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://127.0.0.1/todos');

var Todo = mongoose.model('Todo', {
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
});

module.exports.Todo = Todo;
