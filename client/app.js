var app = angular.module("userApp", ['ngResource', 'ngRoute']);


app.config(function($routeProvider) {
  $routeProvider
  .when('/login', {
    templateUrl: '/views/login.html',
    controller: 'loginController'
  })
  .when('/LandingPage', {
    templateUrl: '/views/LandingPage.html',
    controller: 'userdashboardController'
  })
  .otherwise({
    redirectTo: '/login'
  })
});

app.controller("mainController", function($scope, $location) {
  $scope.page = "home";
});
