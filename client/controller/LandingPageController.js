var app = angular.module("userApp");
app.controller("userdashboardController", function($scope, $route, $location, $http, $resource) {

$scope.places= []
$scope.cooridnates = {latitude:"",longitude:"" };
var nearby = $resource('/api/nearby');


function latlong() {

  var geocoder = new google.maps.Geocoder();
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $scope.coorinates.latitude=lat;
    $scope.coorinates.longitude=lng;

    //lat = lat+0.000456299;
    //lng = lng+0.0030712;
    //codeLatLng(lat, lng)
    nearby.query({latitude:lat,longitude:lng},function(result){
      $scope.places = result;
    });
},function errorFunction(){
    alert("Geocoder failed");
});
  }
}
latlong();
});
