var mongoose = require('mongoose');

// mongoose.connect('mongodb://localhost/todos');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/todos');

var Todo = mongoose.model('Todo', {
  task: String,
  isCompleted: Boolean,
  isEditing: Boolean
});

module.exports.Todo = Todo;
//mongodb://<dbuser>:<dbpassword>@ds141088.mlab.com:41088/mean-todo-app
