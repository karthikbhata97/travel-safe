var app = angular.module("userApp");
app.controller("loginController", function($scope, $location, $rootScope, $resource, $cookies, $http, LoginStatus) {
  $scope.fusers = []
  var FUsers = $resource('/getfusers');

  FUsers.query(function(result) {
    for(var i=0;i<result.length;i++)
      $scope.fusers.push(result[i].userid);
  })

  $scope.page = "Login";
  $scope.login_status = $cookies.get('dash_loggedin')
  $scope.validate = function() {
    $http({
      url: '/login',
      method: 'post',
      data: {"userid": $scope.userid, "password": $scope.password}
    }).then(function(data){
    if(data.data.success=='true'){
      $cookies.put('dash_loggedin', true);
      $cookies.put('dash_userid', $scope.userid);
        $location.path('/LandingPage').replace();
    }
    else
    $scope.errmessage += data.data.reason;
  }, function(err){})
  }

});
