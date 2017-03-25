var app = angular.module("userApp");
app.controller("userdashboardController", function($scope, $route, $location, $http, $resource) {

$scope.places= []
$scope.details= {}
$scope.coordinates = {
  latitude:null,
  longitude:null
};
var nearby = $resource('/api/nearby');
var myplace= $resource('/api/myplace');


var latlong = function() {
  var geocoder = new google.maps.Geocoder();
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function successFunction(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;
    $scope.coordinates.latitude=lat;
    $scope.coordinates.longitude=lng;

    var latlng = new google.maps.LatLng(lat, lng);
    geocoder.geocode({'latLng': latlng}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
      console.log(results)
        if (results[1]) {
     var	txt = document.createTextNode(results[0].formatted_address);
     myplace.query({latitude:$scope.coordinates.latitude,longitude:$scope.coordinates.longitude,address:txt.textContent},function(result){
     $scope.details = result;
      });
    nearby.query({latitude:$scope.coordinates.latitude,longitude:$scope.coordinates.longitude,address:txt.textContent},function(result){
    $scope.places = result;
    });
      } else {
          alert("No results found");
        }
      } else {
        alert("Geocoder failed due to: " + status);
      }
    });
},function errorFunction(){
    alert("Geocoder failed");
});
  }
}
  var codeLatLng = function(lat, lng) {}
latlong();
});
