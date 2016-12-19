import angular from 'angular';
import lodash from 'lodash';

const todoFactory = angular.module('app.todoFactory', [])

.factory('todoFactory', ($http) => {
//this function gets all the todos upon page load.
  function getTasks($scope) {
    $http.get('/todos').success(response => {
      $scope.todos = response.todos;
    });
  }

  function createTask($scope, params) {
    if (!$scope.createTaskInput) {
      return;
    }
//the task is the createTaskInput ng-model, defined in html input field.  Posts to todos server.  The model is cleared with '' after posting to db.

    $http.post('/todos', {
      task: $scope.createTaskInput,
      isCompleted: false,
      isEditing: false
    }).success(response => {
      getTasks($scope);
      $scope.createTaskInput = '';

    });
    // params.createHasInput = false;
    // $scope.createTaskInput = '';
  }
//grabs the todo.updatedTask value which is temporarily part of the todo object.  Sets it to be equal to the task value.
  function updateTask($scope, todo) {
    console.log(todo);
    $http.put(`/todos/${todo._id}`, { task: todo.updatedTask }).success(
      response => {
        getTasks($scope);
        todo.isEditing = false;
      }
    );
    // todo.task = todo.updatedTask;
    // todo.isEditing = false;
  }

  function deleteTask($scope, todoToDelete) {
    $http.delete(`/todos/${todoToDelete._id}`).success(response => {
      getTasks($scope);
    } );
    // _.remove($scope.todos, todo => todo.task === todoToDelete.task);
  }

//this function is triggered whenever a key is pressed by user in the create task input form.  It is made to be true when the user starts typing.  Params is defined as false initially.
  function watchCreateTaskInput(params, $scope, val) {
    const createHasInput = params.createHasInput;
    //if no val is present in the task, remove that task altogether, has input returned to false.
    if (!val && createHasInput) {
      $scope.todos.pop();
      params.createHasInput = false;
    }
    //if val is being entered and and the input was false, the task now equals the val and the input field is true.
    if (val && !createHasInput) {
      $scope.todos.push({task: val, isCompleted: false});
      params.createHasInput = true;
    //if a val is being entered and it's previously filled with input already, that means the user is in the process of entering in the task (not just one character at a time).  The newest todo array value will remain the current one and changes to the val are for that array value.
    } else if (val && createHasInput) {
      $scope.todos[$scope.todos.length - 1].task = val;
    }
  }
  return {
    createTask,
    getTasks,
    updateTask,
    deleteTask,
    watchCreateTaskInput
  };
});

export default todoFactory;
