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
      data: {"userid": $scope.userid, "pass": $scope.password}
    }).then(function(data){
    if(data.data.group=='admin'){
      $cookies.put('dash_loggedin', true);
      $cookies.put('dash_userid', $scope.userid);
      $cookies.put('dash_group', 'admin');
      $location.path('/dashboard_lead').replace();
    }
    else if (data.data.group=='lead' && $scope.fusers.indexOf($scope.userid)==-1) {
      $cookies.put('dash_loggedin', true);
      $cookies.put('dash_userid', $scope.userid);
      $cookies.put('dash_group', 'lead');
      $location.path('/dashboard_lead').replace();
    }
    else if (data.data.group=='user' && $scope.fusers.indexOf($scope.userid)==-1) {
      $cookies.put('dash_loggedin', true);
      $cookies.put('dash_userid', $scope.userid);
      $cookies.put('dash_group', 'user');
      $location.path('/dashboard_user').replace();
    }
      else
    $scope.errmessage += ' Invalid!'
  }, function(err){})
  }


  $scope.$watch('userid', function() {
    if($scope.fusers.indexOf($scope.userid)!=-1)
      $scope.errmessage = 'Your login is forbidden by the admin!'
    else
      $scope.errmessage = ''
  })
});
