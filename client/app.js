var app = angular.module("userApp", ['ngResource', 'ngRoute','ngCookies']);

app.directive('fileModel', ['$parse', 'FileSizeError', 'FileName', function ($parse, FileSizeError, FileName) {
   return {
      restrict: 'A',
      link: function(scope, element, attrs) {
         var model = $parse(attrs.fileModel);
         var modelSetter = model.assign;
         var maxsize = 2000000;
         element.bind('change', function(){
            scope.$apply(function(){
              FileName.setname(element[0].files[0].name);
               modelSetter(scope, element[0].files[0]);
               var filesize = element[0].files[0].size;
               if(filesize>maxsize)
                  FileSizeError.seterror(true)
                else
                  FileSizeError.seterror(false)
            });
         });
      }
   };
}]);

app.factory('FileName', function() {
  var file = {
    name: null
  }
  return {
    getname: function() {
      return file.name;
    },
    setname: function(val) {
      file.name = val
    }
  }
})


app.factory('FileSizeError', function() {
  var whatsup = {
    error: false
  }
  return {
    geterror: function() {
      return whatsup.error;
    },
    seterror: function(val) {
      whatsup.error = val;
    }
  }
});
/*
app.service('uploadAPI', function($http) {
  return {
    upload: function(file) {
      if(file==null) {
        return $http({
          url: '/junk',
          method: 'post'
        });
      }
      var formData = new FormData();
      formData.append("file", file);
      return $http({
        url: '/addfile',
        data: formData,
        method: 'post',
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      });
    }
  }
});
*/
app.config(function($routeProvider) {
  $routeProvider
  .when('/login', {
    resolve: {
      "check": function($location, $cookies, LoginStatus) {
        if($cookies.get('loggedin')) {
          $location.path('/'+$cookies.get('LandingPage'))  ;
        }
      }
    },
    templateUrl: '/views/login.html',
    controller: 'loginController'
  })
  .when('/LandingPage', {
    resolve: {
      "check": function($location, $cookies, LoginStatus) {
        if(!$cookies.get('dash_loggedin')) {
          $location.path('/LandingPage');
        }
      }
    },
    templateUrl: '/views/LandingPage.html',
    controller: 'LandingPageController'
  })
  .otherwise({
    redirectTo: '/login'
  })
});

app.controller("mainController", function($scope, $location, $cookies) {
  $scope.page = "home";
  $scope.cook = $cookies.get('dash_userid');
});
