angular.module('todoController', [])

// inject the Todo service factory into our controller
    .controller('mainController', ['$scope', '$http', 'Todos', '$timeout', function ($scope, $http, Todos, $timeout) {
        $scope.formData = {};
        $scope.loading = true;
        $scope.info = undefined;
        $scope.error = undefined;

        var lastTimeout = undefined;

        function clearMessages(millis) {
            if (millis) {
                if (lastTimeout) {
                    $timeout.cancel(lastTimeout);
                }
                lastTimeout = $timeout(clearMessages, millis);
            } else {
                console.log('clearde messages');
                $scope.info = undefined;
                $scope.error = undefined;
            }
        }

        // GET =====================================================================
        // when landing on the page, get all todos and show them
        // use the service to get all the todos
        Todos.get()
            .success(function (data) {
                $scope.todos = data;
                $scope.loading = false;
            });

        // CREATE ==================================================================
        // when submitting the add form, send the text to the node API
        $scope.createTodo = function () {

            // validate the formData to make sure that something is there
            // if form is empty, nothing will happen
            if ($scope.formData.text !== undefined) {
                $scope.loading = true;

                // call the create function from our service (returns a promise object)
                Todos.create($scope.formData)

                // if successful creation, call our get function to get all the new todos
                    .success(function (data) {
                        $scope.info = 'Todo created: ' + $scope.formData.text;
                        $scope.loading = false;
                        $scope.formData = {}; // clear the form so our user is ready to enter another
                        $scope.todos = data; // assign our new list of todos
                        clearMessages(2500);
                    });
            } else {
                $scope.error = 'Cannot add empty todo';
                clearMessages(2500);
            }
        };

        // DELETE ==================================================================
        // delete a todo after checking it
        $scope.deleteTodo = function (id) {
            $scope.loading = true;

            console.log($scope.todos);

            Todos.delete(id)
            // if successful creation, call our get function to get all the new todos
                .success(function (data) {
                    $scope.todos.forEach(function (todo) {
                        if (todo._id === id) {
                            $scope.info = 'Deleted todo: ' + todo.text;
                        }
                    });
                    $scope.loading = false;
                    $scope.todos = data; // assign our new list of todos
                    clearMessages(2500);
                });
        };
    }]);