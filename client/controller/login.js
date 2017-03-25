var app = angular.module("userApp");
app.controller("loginController", function($scope, $location, $rootScope, $resource, $http) {
  $scope.page = "Login";
  $scope.userid="";
  $scope.password="";
  $scope.validate = function() {
    $http({
      url: '/login',
      method: 'post',
      data: {"userid": $scope.userid, "password": $scope.password}

    }).then(function(data){
    if(data.data.success==true){
        $location.path('/LandingPage').replace();
    }
    else
    $scope.errmessage += data.data.reason;
  }, function(err){})
  }

});
