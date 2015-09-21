(function () {
    'use strict';
var app = angular.module('app', []);
app.controller('userController', ['$scope', '$http', userController]);
function userController($scope, $http) {
    $scope.loading = true;
    $scope.addMode = false;
    $http.get('/api/User/').success(function (data) {
        $scope.users = data;
        $scope.loading = false;
    })
    .error(function () {
        $scope.error = "An Error has occured while loading posts!";
        $scope.loading = false;
    });
    $scope.toggleEdit = function () {
        this.user.editMode = !this.user.editMode;
    };
    $scope.toggleAdd = function () {
        $scope.addMode = !$scope.addMode;
    };
    $scope.add = function () {
        $scope.loading = true;
        $http.post('/api/User/', this.newuser).success(function (data) {
            alert("Added Successfully!!");
            $scope.addMode = false;
            $scope.users.push(data);
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Adding Customer! " + data;
            $scope.loading = false;
        });
    };
    $scope.save = function () {
        alert("Edit");
        $scope.loading = true;
        var obj = this.user;
        alert(obj);
        $http.put('/api/User/' + obj.Id, obj).success(function (data) {
            alert("Saved Successfully!!");
            obj.editMode = false;
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving customer! " + data;
            $scope.loading = false;
        });
    };
    $scope.deleteuser = function () {
        $scope.loading = true;
        var Id = this.user.Id;
        $http.delete('/api/User/' + Id).success(function (data) {
            alert("Deleted Successfully!!");
            $.each($scope.users, function (i) {
                if ($scope.users[i].Id === Id) {
                    $scope.users.splice(i, 1);
                    return false;
                }
            });
            $scope.loading = false;
        }).error(function (data) {
            $scope.error = "An Error has occured while Saving Customer! " + data;
            $scope.loading = false;
        });
    };
}
})();