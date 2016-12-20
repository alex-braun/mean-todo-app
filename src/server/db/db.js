var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/todos');
// mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');
 mongoose.connect('mongodb://alexbraun:77771234@ds141088.mlab.com:41088/mean-todo-app');
var Todo = mongoose.model('Todo', {
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
});

module.exports.Todo = Todo;
