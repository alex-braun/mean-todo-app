import lodash from 'lodash';

export default function($scope, todoFactory) {
  let params = {
    createHasInput: false
  };

  const { createTask,
          updateTask,
          deleteTask,
          watchCreateTaskInput }
          = todoFactory;

  // $scope.todos = [
  //   {
  //     task: 'do dishes',
  //     isCompleted: false,
  //     isEditing: false
  //   },
  //   {
  //     task: 'walk dog',
  //     isCompleted: true,
  //     isEditing: false
  //   }
  // ];
//this calls the getTasks function located in todo-factory.js on page load.
  todoFactory.getTasks($scope);

//onCompletedClick is triggered when checkbox input is selected.  Whatever the status of isCompleted, isCompleted becomes NOT that status.
  $scope.onCompletedClick = todo => {
    todo.isCompleted = !todo.isCompleted;
  };
//if todo.isEditing is true, the cancel button appears.  onCancelClick called when the button is pressed.
  $scope.onCancelClick = todo => {
    todo.isEditing = false;
  };

//onEditClick is triggered when the edit button is presssed. This turns isEditing to true, which causes the edit button to disappear and the update form to appear.  ng-model todo.updatedTask is created and defined as the new todo.task.
  $scope.onEditClick = todo => {
    todo.isEditing = true;
    todo.updatedTask  = todo.task;
  };
//CRUD actions
//lodash equivilant to .bind(this)

//createTask triggered when the Create Task button is pressed.  Binds 'this' via _.partial to createTask.todoFactory and passes $scope and params as variables.  todo does not need to be passed as a variable because it is automatically passed.
  $scope.createTask = _.partial(createTask, $scope, params);
//updateTask function is called when the update form is submitted.  This form is only present when todo.isEditing is true.
  $scope.updateTask = _.partial(updateTask, $scope);
  $scope.deleteTask = _.partial(deleteTask, $scope);
  $scope.$watch('createTaskInput', _.partial(watchCreateTaskInput, params, $scope));
}
